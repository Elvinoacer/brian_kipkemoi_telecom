"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import type { FieldTestRow } from "@/data/portfolio";

const axisStyle = {
  fontSize: 10,
  fontFamily: "var(--font-geist-mono), monospace",
  fill: "#748b9e",
};

const tooltipStyle = {
  backgroundColor: "#0d1620",
  border: "1px solid #223244",
  borderRadius: "10px",
  fontSize: "12px",
  fontFamily: "var(--font-geist-mono), monospace",
  color: "#f2f7fa",
  boxShadow: "0 12px 32px -12px rgba(2,8,16,0.9)",
};

/* ── RSSI + SNR vs distance ───────────────────────────────────────────── */

export function RssiChart({ data, syncId }: { data: FieldTestRow[]; syncId?: string }) {
  const chartData = data.map((r) => ({
    distance: r.distance,
    RSSI: r.rssi,
    SNR: r.snr,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={chartData} margin={{ top: 8, right: 12, left: -8, bottom: 4 }} syncId={syncId}>
        <CartesianGrid stroke="#162230" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="distance" tick={axisStyle} tickLine={false} axisLine={{ stroke: "#223244" }} dy={4} />
        <YAxis
          yAxisId="rssi"
          domain={[-130, -50]}
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          label={{
            value: "RSSI dBm",
            angle: -90,
            position: "insideLeft",
            style: { ...axisStyle, fill: "#38bdf8" },
          }}
        />
        <YAxis
          yAxisId="snr"
          orientation="right"
          domain={[-12, 14]}
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          label={{
            value: "SNR dB",
            angle: 90,
            position: "insideRight",
            style: { ...axisStyle, fill: "#a78bfa" },
          }}
        />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#38bdf8", strokeOpacity: 0.3 }} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-geist-mono), monospace" }} />
        <ReferenceLine yAxisId="rssi" y={-120} stroke="#f87171" strokeDasharray="4 4" label={{ value: "practical floor", fill: "#f87171", fontSize: 9, position: "insideBottomLeft" }} />
        <Line yAxisId="rssi" type="monotone" dataKey="RSSI" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3, fill: "#38bdf8", strokeWidth: 0 }} activeDot={{ r: 5 }} />
        <Line yAxisId="snr" type="monotone" dataKey="SNR" stroke="#a78bfa" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3, fill: "#a78bfa", strokeWidth: 0 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ── Packet Delivery Ratio vs distance ────────────────────────────────── */

export function PdrChart({ data, syncId }: { data: FieldTestRow[]; syncId?: string }) {
  const chartData = data.map((r) => ({
    distance: r.distance,
    PDR: Math.round((r.received / r.sent) * 1000) / 10,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData} margin={{ top: 8, right: 12, left: -8, bottom: 4 }} syncId={syncId}>
        <defs>
          <linearGradient id="pdrFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#34d399" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#162230" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="distance" tick={axisStyle} tickLine={false} axisLine={{ stroke: "#223244" }} dy={4} />
        <YAxis domain={[0, 100]} tick={axisStyle} tickLine={false} axisLine={false} unit="%" />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#34d399", strokeOpacity: 0.3 }} />
        <ReferenceLine y={95} stroke="#fbbf24" strokeDasharray="4 4" label={{ value: "95% target", fill: "#fbbf24", fontSize: 9, position: "insideTopRight" }} />
        <Area type="monotone" dataKey="PDR" stroke="#34d399" strokeWidth={2} fill="url(#pdrFill)" dot={{ r: 3, fill: "#34d399", strokeWidth: 0 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ── BER vs Eb/N0 (modulation project) ────────────────────────────────── */

const berTheory = [
  { ebno: "0", BPSK: 7.9e-2, QPSK: 7.9e-2, QAM16: null as number | null },
  { ebno: "2", BPSK: 3.8e-2, QPSK: 3.8e-2, QAM16: 1.7e-1 },
  { ebno: "4", BPSK: 1.3e-2, QPSK: 1.3e-2, QAM16: 8.0e-2 },
  { ebno: "6", BPSK: 2.4e-3, QPSK: 2.4e-3, QAM16: 3.2e-2 },
  { ebno: "8", BPSK: 1.9e-4, QPSK: 1.9e-4, QAM16: 8.1e-3 },
  { ebno: "10", BPSK: 4.0e-6, QPSK: 4.0e-6, QAM16: 1.0e-3 },
  { ebno: "12", BPSK: 9.0e-9, QPSK: 9.0e-9, QAM16: 5.8e-5 },
  { ebno: "14", BPSK: 1.0e-12, QPSK: 1.0e-12, QAM16: 1.7e-6 },
];

export function BerChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={berTheory} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
        <CartesianGrid stroke="#162230" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="ebno" tick={axisStyle} tickLine={false} axisLine={{ stroke: "#223244" }} dy={4} label={{ value: "Eb/N0 (dB)", position: "insideBottomRight", offset: -2, style: axisStyle }} />
        <YAxis
          scale="log"
          domain={["1e-12", "1"]}
          ticks={[1e-12, 1e-10, 1e-8, 1e-6, 1e-4, 1e-2, 1]}
          tickFormatter={(v: number) => v.toExponential(0)}
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
          width={52}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          cursor={{ stroke: "#a78bfa", strokeOpacity: 0.3 }}
          formatter={(value: any) => (typeof value === "number" ? value.toExponential(1) : String(value ?? ""))}
        />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-geist-mono), monospace" }} />
        <Line type="monotone" dataKey="BPSK" stroke="#34d399" strokeWidth={2} dot={false} connectNulls />
        <Line type="monotone" dataKey="QPSK" stroke="#38bdf8" strokeWidth={2} dot={false} connectNulls />
        <Line type="monotone" dataKey="QAM16" stroke="#fbbf24" strokeWidth={2} dot={false} connectNulls />
      </LineChart>
    </ResponsiveContainer>
  );
}
