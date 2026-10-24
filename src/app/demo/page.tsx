"use client";

import { AskPanel } from "@/components/AskPanel";
import { useApp } from "@/hooks/useClient";

export default function DemoPage() {
  const { t } = useApp();
  return (
    <div className="space-y-4">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">{t("demoTitle")}</h1>
      <ol className="frame list-decimal rounded-[28px] p-5 pl-8 leading-relaxed">
        <li>{t("demoStep1")}</li>
        <li>{t("demoStep2")}</li>
        <li>{t("demoStep3")}</li>
        <li>{t("demoStep4")}</li>
        <li>{t("demoStep5")}</li>
        <li>{t("demoStep6")}</li>
      </ol>
      <AskPanel demoPresets />
    </div>
  );
}
