import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    IconChevronDown,
    IconChevronUp,
    IconCornerDownRight,
} from "@tabler/icons-react";

export default function LinkItemDropdown({
    icon,
    title,
    data,
    access,
    sidebarOpen,
    ...props
}) {
    const { auth } = usePage().props;
    const canAccess = auth.super === true || access === true;
    const hasActiveChild = data.some((item) => item.active);

    const [isOpen, setIsOpen] = useState(hasActiveChild);

    useEffect(() => {
        if (hasActiveChild) {
            setIsOpen(true);
        }
    }, [hasActiveChild]);

    if (!canAccess) return null;

    const buttonClasses = sidebarOpen
        ? `min-w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              hasActiveChild
                  ? "border-l-[3px] border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-500 dark:bg-primary-950/50 dark:text-primary-400"
                  : "border-l-[3px] border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          }`
        : `w-full flex justify-center py-3 transition-all duration-200 ${
              hasActiveChild
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          }`;

    return (
        <>
            <button
                className={buttonClasses}
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
            >
                {sidebarOpen ? (
                    <>
                        <div className="flex items-center gap-3">
                            <span
                                className={
                                    hasActiveChild
                                        ? "text-primary-600 dark:text-primary-400"
                                        : ""
                                }
                            >
                                {icon}
                            </span>
                            <span className="truncate">{title}</span>
                        </div>
                        {isOpen ? (
                            <IconChevronUp size={18} strokeWidth={1.5} />
                        ) : (
                            <IconChevronDown size={18} strokeWidth={1.5} />
                        )}
                    </>
                ) : !isOpen ? (
                    icon
                ) : (
                    <IconChevronDown size={20} strokeWidth={1.5} />
                )}
            </button>

            {isOpen &&
                data.map(
                    (item, i) =>
                        item.permissions === true && (
                            <Link
                                key={i}
                                href={item.href}
                                className={
                                    sidebarOpen
                                        ? `ml-4 mr-2 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                              item.active
                                                  ? "bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-400"
                                                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                          }`
                                        : `flex justify-center py-3 transition-all duration-200 ${
                                              item.active
                                                  ? "bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400"
                                                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                          }`
                                }
                                title={item.title}
                                {...props}
                            >
                                {sidebarOpen ? (
                                    <>
                                        <IconCornerDownRight
                                            size={18}
                                            strokeWidth={1.5}
                                        />
                                        <span className="truncate">
                                            {item.title}
                                        </span>
                                    </>
                                ) : (
                                    item.icon
                                )}
                            </Link>
                        )
                )}
        </>
    );
}
