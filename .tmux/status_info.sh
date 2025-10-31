#!/usr/bin/env bash

# Battery percentage (works on Linux with acpi)
if command -v acpi >/dev/null 2>&1; then
    battery=$(acpi -b | awk -F', ' '{print $2}' | head -1)
else
    battery="N/A"
fi

# CPU usage (average over all cores)
cpu=$(top -bn1 | grep "Cpu(s)" | awk '{print 100 - $8"%"}')

# Memory usage
mem=$(free -h | awk '/Mem:/ {print $3 "/" $2}')

# Combine into one line
echo "⚡ $battery | 💻 CPU: $cpu | 🧠 RAM: $mem"

