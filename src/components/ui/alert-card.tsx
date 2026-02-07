import * as React from "react";
import { motion, AnimatePresence, type Variants, type HTMLMotionProps } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";

// Define the props for the AlertCard component
interface AlertCardProps extends HTMLMotionProps<"div"> {
    icon?: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    onButtonClick: () => void;
    isVisible: boolean;
    onDismiss?: () => void;
}

const AlertCard = React.forwardRef<HTMLDivElement, AlertCardProps>(
    ({
        className,
        icon,
        title,
        description,
        buttonText,
        onButtonClick,
        isVisible,
        onDismiss,
        ...props
    }, ref) => {

        // Animation variants for the card container
        const cardVariants: Variants = {
            hidden: { opacity: 0, y: 50, scale: 0.95 },
            visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    staggerChildren: 0.1,
                }
            },
            exit: {
                opacity: 0,
                y: 20,
                scale: 0.98,
                transition: { duration: 0.2 }
            }
        };

        // Animation variants for child elements for a staggered effect
        const itemVariants = {
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
        };

        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        ref={ref}
                        className={cn(
                            "relative w-full max-w-sm overflow-hidden rounded-2xl p-6 shadow-2xl",
                            "bg-[#1a1a1a] text-white border border-gray-800", // Adapted for dark theme
                            className
                        )}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        role="alert"
                        aria-live="assertive"
                        {...props}
                    >
                        {/* Optional dismiss button */}
                        {onDismiss && (
                            <motion.div variants={itemVariants} className="absolute top-3 right-3">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                                    onClick={onDismiss}
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Dismiss</span>
                                </Button>
                            </motion.div>
                        )}

                        {/* Icon with a subtle pulse animation */}
                        {icon && (
                            <motion.div
                                variants={itemVariants}
                                className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/5"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {icon}
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Title */}
                        <motion.h3 variants={itemVariants} className="text-2xl font-bold tracking-tight mb-2">
                            {title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p variants={itemVariants} className="mt-2 text-sm text-gray-400 max-w-[80%] mb-6">
                            {description}
                        </motion.p>

                        {/* Action Button */}
                        <motion.div variants={itemVariants} className="mt-6">
                            <Button
                                className="w-full rounded-full bg-red-600 py-6 text-base font-semibold text-white shadow-lg transition-transform duration-200 hover:bg-red-700 active:scale-95"
                                onClick={onButtonClick}
                            >
                                {buttonText}
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }
);
AlertCard.displayName = "AlertCard";

export { AlertCard };
