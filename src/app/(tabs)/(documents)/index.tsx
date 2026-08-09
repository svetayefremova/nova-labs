import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCSSVariable } from "uniwind";

import notFoundIllustration from "@/assets/images/not_found.png";
import { DocumentRow } from "@/src/components/documents/document-row";
import { UploadDocumentSheet } from "@/src/components/documents/upload-document-sheet";
import { PageWrapper } from "@/src/components/layout";
import { Button, Icon, Text, TextInput } from "@/src/components/ui";
import type { DocType } from "@/src/constants/document";
import { TABLET } from "@/src/constants/layout";
import { Routes } from "@/src/constants/routes";
import { formatBytes } from "@/src/helpers/file";
import { useDocuments } from "@/src/hooks/use-documents";
import { useUserProfile } from "@/src/hooks/use-user-profile";
import type { Document, PickedFile } from "@/src/types/domain";

export default function DocumentsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const mockDocs = useDocuments();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { profile } = useUserProfile();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<Document[]>([]);
  const [search, setSearch] = useState("");

  const mutedColor = String(useCSSVariable("--color-muted"));
  const isTablet = width >= TABLET;

  const allDocuments = [...uploadedDocs, ...mockDocs];
  const documents = search
    ? allDocuments.filter((d) =>
        d.title.toLowerCase().includes(search.toLowerCase()),
      )
    : allDocuments;

  function handleUpload(files: PickedFile[], type: DocType) {
    const today = new Date().toLocaleDateString("en-CA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const newDocs: Document[] = files.map((file) => ({
      id: `uploaded-${file.uri}`,
      title: file.name,
      type,
      date: today,
      size: formatBytes(file.size),
      uri: file.uri,
      mimeType: file.mimeType,
    }));
    setUploadedDocs((prev) => [...newDocs, ...prev]);
    setIsUploadOpen(false);
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;

  const searchBar = (containerClassName: string) => (
    <View
      className={`flex-row items-center gap-2 px-3 h-14 md:h-12 rounded-2xl md:rounded-full bg-surface md:border border-surface-border ${containerClassName}`}
    >
      <Icon name="search" size={16} color={mutedColor} />
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder={t("header.documents.search_placeholder")}
        placeholderTextColor={mutedColor}
        className="flex-1 text-[14px] text-text font-sans-medium web:outline-none"
      />
    </View>
  );

  const uploadButton = (
    <Button size="md" onPress={() => setIsUploadOpen(true)}>
      <Icon name="upload" size={16} color="white" />
      <Button.Label className="text-reverse font-sans-semibold">
        {t("document.upload.action")}
      </Button.Label>
    </Button>
  );

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-28"
        showsVerticalScrollIndicator={false}
      >
        <PageWrapper className="pt-6">
          {isTablet ? (
            <View className="px-4 mb-5 flex-row items-center gap-4">
              <View className="gap-1 flex-1">
                <Text variant="heading">{t("header.documents.title")}</Text>
                <Text variant="label" color="muted">
                  {t("header.documents.files_count", {
                    count: allDocuments.length,
                    name: fullName,
                  })}
                </Text>
              </View>
              {searchBar("w-[220px]")}
              {uploadButton}
            </View>
          ) : (
            <View className="px-4 mb-5 gap-3">
              <View className="gap-1">
                <Text variant="heading">{t("header.documents.title")}</Text>
                <Text variant="label" color="muted">
                  {t("header.documents.files_count", {
                    count: allDocuments.length,
                    name: fullName,
                  })}
                </Text>
              </View>
              {searchBar("flex-1")}
            </View>
          )}

          {search && documents.length === 0 ? (
            <View className="px-4 md:pt-6 items-center gap-2">
              <View className="w-full h-[280px] md:h-[380px]">
                <Image
                  source={notFoundIllustration}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                  accessible={false}
                />
              </View>
              <Text variant="subtitle" className="font-sans-bold mt-2">
                {t("document.empty_search_title")}
              </Text>
              <Text variant="body" color="muted" className="text-center">
                {t("document.empty_search_subtitle", { query: search })}
              </Text>
            </View>
          ) : (
            <View className="px-4 lg:grid lg:grid-cols-2 lg:gap-3">
              {documents.map((doc) => (
                <View key={doc.id} className="mb-3 lg:mb-0">
                  <DocumentRow
                    document={doc}
                    onPress={() => {
                      if (doc.uri) {
                        router.push({
                          pathname: Routes.fileViewer,
                          params: { uri: doc.uri, title: doc.title },
                        });
                      } else {
                        router.push({
                          pathname: Routes.documentDetail,
                          params: { id: doc.id },
                        });
                      }
                    }}
                  />
                </View>
              ))}
            </View>
          )}
        </PageWrapper>
      </ScrollView>

      {!isTablet && (
        <Pressable
          onPress={() => setIsUploadOpen(true)}
          className="absolute right-4 w-[60px] h-[60px] rounded-full bg-primary items-center justify-center"
          style={{ bottom: insets.bottom + 10 }}
          accessibilityRole="button"
        >
          <Icon name="plus" size={24} color="white" />
        </Pressable>
      )}

      <UploadDocumentSheet
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUpload}
      />
    </View>
  );
}
