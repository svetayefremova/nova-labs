import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Accordion } from 'heroui-native';
import { useTranslation } from 'react-i18next';
import { Platform, ScrollView, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Header, PageWrapper } from '@/src/components/layout';
import { Text } from '@/src/components/ui';
import { useDocuments } from '@/src/hooks/use-documents';

export default function DocumentDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const textColor = String(useCSSVariable('--color-text'));
  const { id } = useLocalSearchParams<{ id: string }>();
  const documents = useDocuments();
  const document = documents.find((d) => d.id === id) ?? documents[0];

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <Header onBack={() => router.back()} />,
        }}
      />
      <ScrollView
        className="flex-1"
        contentContainerClassName={'pb-28'}
        showsVerticalScrollIndicator={false}
      >
        <PageWrapper className="pt-6">
          <View className="px-4 mb-5 gap-1">
            <Text variant="heading">{document.title}</Text>
            {document.author && (
              <Text variant="label" color="muted">
                {document.author}
              </Text>
            )}
          </View>

          <Text variant="caption" color="muted" className="px-4 mb-4 font-sans-semibold">
            {[
              t('document.uploaded', { date: document.date }),
              ...(document.pages ? [document.pages] : []),
              document.size,
            ].join(' · ')}
          </Text>
          {document.sections && document.sections.length > 0 && (
            <View className="mx-4 gap-2">
              {document.sections.map((section, i) => (
                <Accordion
                  key={section.title}
                  defaultValue={section.title}
                  animation={Platform.OS === 'web' ? 'disable-all' : undefined}
                >
                  <Accordion.Item
                    value={section.title}
                    className="rounded-[24px] bg-white web:border web:border-black/8"
                  >
                    <Accordion.Trigger className="px-4 py-3">
                      <View className="flex-1 flex-row items-center gap-3">
                        <View className="w-8 h-8 rounded-full bg-background items-center justify-center">
                          <Text variant="overline">{String(i + 1).padStart(2, '0')}</Text>
                        </View>
                        <Text variant="label" className="text-[16px] flex-1">
                          {section.title}
                        </Text>
                      </View>
                      <Accordion.Indicator iconProps={{ color: textColor, size: 20 }} />
                    </Accordion.Trigger>
                    <Accordion.Content className="px-4 pb-4 pt-0">
                      <Text variant="caption" className="leading-relaxed">
                        {section.body}
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion>
              ))}
            </View>
          )}
        </PageWrapper>
      </ScrollView>
    </>
  );
}
