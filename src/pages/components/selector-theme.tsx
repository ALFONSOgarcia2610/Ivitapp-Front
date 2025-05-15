"use client";

import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select";
import { useThemeConfig } from "@/providers/active-theme.provider";
import { ModeToggle } from "./mode-toggle";

const COLOR_THEMES = [
    { name: "Default", value: "default", color: "#f5f5f5" },
    { name: "Red", value: "red", color: "#ef4444" },
    { name: "Rose", value: "rose", color: "#ec4899" },
    { name: "Orange", value: "orange", color: "#f59e0b" },
    { name: "Green", value: "green", color: "#22c55e" },
    { name: "Blue", value: "blue", color: "#3b82f6" },
    { name: "Yellow", value: "yellow", color: "#eab308" },
    { name: "Violet", value: "violet", color: "#a855f7" },
];

export function ThemeSelector() {
    const { colorTheme, setColorTheme } = useThemeConfig();
    const currentColor = COLOR_THEMES.find((theme) => theme.value === colorTheme);

    return (
        <div className="flex gap-2">
            <div className="flex items-center">
                <Label htmlFor="color-selector" className="sr-only">
                    Color
                </Label>
                <Select value={colorTheme} onValueChange={setColorTheme}>
                    <SelectTrigger
                        id="color-selector"
                        size="sm"
                        className="justify-start"
                    >
                        <span
                            className="w-4 h-4 rounded-full shadow mr-2 border"
                            style={{
                                backgroundColor: currentColor?.color || "#ffffff",
                                borderColor: currentColor?.color || "#ffffff",
                            }}
                        />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Colores</SelectLabel>
                            {COLOR_THEMES.map((theme) => (
                                <SelectItem key={theme.value} value={theme.value}>
                                    <span
                                        className="w-4 h-4 rounded-full inline-block mr-2"
                                        style={{ backgroundColor: theme.color }}
                                    />
                                    {theme.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <ModeToggle />
        </div>
    );
}
