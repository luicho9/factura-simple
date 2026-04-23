"use client";

import { StyleSheet, Text } from "@react-pdf/renderer";
import type { PresetPdfSlotProps } from "../../types";

const styles = StyleSheet.create({
  text: { color: "#6b7280", marginTop: 2 },
  label: { fontFamily: "Helvetica-Bold" },
});

export function HnPdfClient({ invoice }: PresetPdfSlotProps) {
  const rtn = invoice.client.taxId;
  if (!rtn) {
    return null;
  }
  return (
    <Text style={styles.text}>
      <Text style={styles.label}>RTN: </Text>
      {rtn}
    </Text>
  );
}
