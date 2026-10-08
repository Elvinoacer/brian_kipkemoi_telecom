"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated LoRa system architecture:
 * Sensor Node → RF Link → Gateway → Application Server → Dashboard
 * Packets visibly hop along the chain.
 */
export function LoraArchitecture() {
  const reduce = useReducedMotion();
  const stops = [10, 34, 58, 82]; // x percentages for stages

  const stages = [
    {
      title: "Sensor Node",
      lines: ["ESP32 + sensors", "LoRa SX1278", "Battery / solar"],
      accent: "#34d399",
    },
    {
      title: "LoRa RF Link",
      lines: ["868 MHz ISM", "SF10 · BW 125 kHz", "+14 dBm"],
      accent: "#38bdf8",
    },
    {
      title: "Gateway",
      lines: ["LoRa receiver", "ESP32 / RPi", "Wi-Fi / Ethernet"],
      accent: "#fbbf24",
    },
    {
      title: "App Server",
      lines: ["Packet logging", "MQTT broker", "Storage"],
      accent: "#a78bfa",
    },
    {
      title: "Dashboard",
      lines: ["Time-series", "Alerts", "Trends"],
      accent: "#7dd3fc",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="relative min-w-[760px] rounded-xl border border-line bg-surface/60 p-5">
        {/* RF link baseline */}
        <div className="absolute left-[6%] right-[6%] top-[64px] hidden h-px bg-line md:block" aria-hidden />

        <div className="grid grid-cols-5 gap-3">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 * i, duration: 0.5 }}
              className="relative"
            >
              <div
                className="rounded-lg border bg-elevated/80 p-3 text-center"
                style={{ borderColor: `${stage.accent}33` }}
              >
                <div
                  className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-md"
                  style={{ background: `${stage.accent}18`, color: stage.accent }}
                >
                  <span className="font-mono text-[10px] font-bold">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-xs font-semibold" style={{ color: stage.accent }}>
                  {stage.title}
                </p>
                {stage.lines.map((l) => (
                  <p key={l} className="mt-0.5 font-mono text-[9px] leading-relaxed text-muted-foreground">
                    {l}
                  </p>
                ))}
              </div>

              {/* animated packet between stages */}
              {i < stages.length - 1 && !reduce && (
                <motion.span
                  className="absolute top-[10px] z-10 h-1.5 w-1.5 rounded-full"
                  style={{ background: stage.accent, boxShadow: `0 0 8px ${stage.accent}` }}
                  animate={{ left: ["96%", "158%"] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: 1.2 * i,
                    repeatDelay: 3.4,
                    ease: "linear",
                  }}
                  aria-hidden
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-3">
          <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
            system architecture · telemetry chain
          </span>
          <div className="flex gap-1">
            {stops.map((s) => (
              <span
                key={s}
                className="h-1 w-6 rounded-full bg-signal-cyan/30"
                style={{ opacity: 0.3 + s / 130 }}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
