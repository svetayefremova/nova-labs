import { Stack, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, useWindowDimensions, View } from "react-native";
import { useCSSVariable } from "uniwind";

import overviewIllustration from "@/assets/images/overview.png";
import { HighRiskCard } from "@/src/components/home/high-risk-card";
import { StatCard } from "@/src/components/home/stat-card";
import { Header, PageWrapper } from "@/src/components/layout";
import { Card, Icon, IconButton, Text } from "@/src/components/ui";
import { TABLET } from "@/src/constants/layout";
import { shadows } from "@/src/constants/theme";
import { PATIENT, useScanReports } from "@/src/hooks/use-scan-reports";
import { useUserProfile } from "@/src/hooks/use-user-profile";

export default function OverviewScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const reports = useScanReports();

  const { profile } = useUserProfile();
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const age = (() => {
    const [m, d, y] = profile.dob.split("/").map(Number);
    if (!y) return PATIENT.age;
    const today = new Date();
    let a = today.getFullYear() - y;
    if (
      today.getMonth() + 1 < m ||
      (today.getMonth() + 1 === m && today.getDate() < d)
    )
      a--;
    return a;
  })();

  const reverseColor = String(useCSSVariable("--color-reverse"));

  const isTablet = width >= TABLET;
  const totalReports = reports.length;
  const allSections = reports.flatMap((r) => r.sections);
  const totalCritical = allSections.reduce(
    (sum, s) => sum + s.counts.critical,
    0,
  );

  const worstSection = allSections
    .filter((s) => s.oncoRads != null)
    .sort((a, b) => (b.oncoRads ?? 0) - (a.oncoRads ?? 0))[0];

  const oldestYear = reports
    .map((r) => parseInt(r.date.split(" ").at(-1) ?? "0", 10))
    .filter(Boolean)
    .sort((a, b) => a - b)[0];

  const recommendation =
    worstSection?.recommendation ??
    "Continue routine screening. No critical findings detected across all reports.";

  const location = [profile.city, profile.state].filter(Boolean).join(", ");

  const patientHeader = (
    <Card className="bg-primary gap-4" style={shadows.card}>
      <View className="flex-row items-center gap-4 pb-4">
        <View className="w-12 h-12 rounded-full items-center justify-center bg-white/20">
          <Icon name="patient" size={24} color={reverseColor} />
        </View>
        <View className="flex-1">
          <Text variant="title" className="text-reverse font-sans-bold">
            {fullName}
          </Text>
          <Text variant="caption" className="text-reverse opacity-80">
            {t("scan.patient_age", { age })} · MRN {PATIENT.mrn}
          </Text>
        </View>
        <IconButton
          name="edit"
          className="bg-white/0"
          color={reverseColor}
          onPress={() => router.navigate("/(tabs)/(home)/update-profile")}
        />
      </View>

      <View className="h-px bg-white/40 mb-4" />

      <View className="md:flex-row flex-wrap gap-3 px-2">
        {profile.dob ? (
          <View className="flex-row items-center gap-2">
            <Icon name="calendar" size={13} color={reverseColor} />
            <Text
              variant="caption"
              className="text-reverse opacity-90 font-sans-semibold"
            >
              {profile.dob}
            </Text>
          </View>
        ) : null}
        {profile.email ? (
          <View className="flex-row items-center gap-2">
            <Icon name="mail" size={13} color={reverseColor} />
            <Text
              variant="caption"
              className="text-reverse opacity-90 font-sans-semibold"
            >
              {profile.email}
            </Text>
          </View>
        ) : null}
        {location ? (
          <View className="flex-row items-center gap-2">
            <Icon name="home" size={13} color={reverseColor} />
            <Text
              variant="caption"
              className="text-reverse opacity-90 font-sans-semibold"
            >
              {location}
            </Text>
          </View>
        ) : null}
      </View>
    </Card>
  );

  const statsRow = (
    <View className="flex-row gap-3">
      <StatCard
        icon="activity"
        value={String(totalCritical)}
        label={t("profile.stat_critical")}
      />
      <StatCard
        icon="documents"
        value={String(totalReports)}
        label={t("profile.stat_reports")}
      />
      <StatCard
        icon="calendar"
        value={String(oldestYear)}
        label={t("profile.stat_since")}
      />
    </View>
  );

  const recommendationCard = (
    <Card className="bg-primary/12">
      <View className="flex-row gap-4">
        <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mt-1">
          <Icon name="info" size={20} color={reverseColor} />
        </View>
        <View className="flex-1 gap-2">
          <Text variant="subtitle" className="font-sans-bold">
            {t("profile.recommendation_next_step")}
          </Text>
          <Text variant="body">{recommendation}</Text>
          <Text variant="caption" color="muted">
            {t("profile.recommendation_disclaimer")}
          </Text>
        </View>
      </View>
    </Card>
  );

  if (isTablet) {
    return (
      <>
        <Stack.Screen
          options={{ header: () => <Header onBack={() => router.back()} /> }}
        />
        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-20"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <PageWrapper className="pt-6 px-4">
            <View className="mb-6">
              <Text variant="heading">{t("profile.patient_overview")}</Text>
            </View>

            <View className="flex-row gap-6 items-start mb-6">
              <View className="w-[50%] lg:w-[40%] gap-6">
                {patientHeader}
                <HighRiskCard
                  sectionId={worstSection?.id}
                  sectionName={worstSection?.name}
                  oncoRads={worstSection?.oncoRads}
                />
              </View>

              <View className="flex-1 items-start" pointerEvents="none">
                <Image
                  source={overviewIllustration}
                  style={{
                    width: "100%",
                    height: width * 0.3,
                    alignSelf: "center",
                  }}
                  resizeMode="contain"
                  accessible={false}
                  aria-hidden
                />
              </View>
            </View>

            <View className="gap-4">
              <Text variant="subtitle" color="muted">
                {t("profile.health_overview")}
              </Text>
              {statsRow}
              <Text variant="subtitle" color="muted" className="mt-4">
                {t("profile.recommendation_title")}
              </Text>
              {recommendationCard}
            </View>
          </PageWrapper>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{ header: () => <Header onBack={() => router.back()} /> }}
      />
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-28"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <PageWrapper className="pt-6">
          <View className="px-4 mb-6">
            <Text variant="heading">{t("profile.patient_overview")}</Text>
          </View>

          <View className="px-4 mb-6">{patientHeader}</View>

          <View className="px-4 mb-6">
            <HighRiskCard
              sectionId={worstSection?.id}
              sectionName={worstSection?.name}
              oncoRads={worstSection?.oncoRads}
            />
          </View>

          <View className="px-4 mb-6 gap-4">
            <Text variant="subtitle" color="muted">
              {t("profile.health_overview")}
            </Text>
            {statsRow}
          </View>

          <View className="px-4 mb-6 gap-4">
            <Text variant="subtitle" color="muted">
              {t("profile.recommendation_title")}
            </Text>
            {recommendationCard}
          </View>
        </PageWrapper>
      </ScrollView>
    </>
  );
}
