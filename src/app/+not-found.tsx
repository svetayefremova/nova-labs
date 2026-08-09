import { Stack, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Image,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import { Header, PageWrapper, WebNav } from "@/src/components/layout";
import { Button, Text } from "@/src/components/ui";

import notFoundIllustration from "@/assets/images/not_found.png";

export default function NotFoundScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const imageSize = Math.min(width - 64, 500);

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          header: Platform.OS === "web" ? () => null : () => <Header />,
        }}
      />
      {Platform.OS === "web" && <WebNav />}
      <ScrollView
        className="flex-1"
        contentContainerClassName={"pt-4 pb-28"}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        alwaysBounceVertical={false}
      >
        <PageWrapper className="flex-1 items-center justify-center gap-8 px-4">
          <View className="px-4 lg:px-8">
            <Image
              source={notFoundIllustration}
              style={{ width: imageSize, height: imageSize }}
              resizeMode="cover"
            />
          </View>

          <View className="items-center gap-3">
            <Text variant="title" className="font-sans-bold text-center">
              {t("not_found.title")}
            </Text>
            <Text variant="body" color="muted" className="text-center">
              {t("not_found.subtitle")}
            </Text>
          </View>

          <View className="w-full md:items-center">
            <Button onPress={() => router.replace("/(tabs)/(home)")}>
              <Button.Label className="text-white">
                {t("not_found.go_home")}
              </Button.Label>
            </Button>
          </View>
        </PageWrapper>
      </ScrollView>
    </View>
  );
}
