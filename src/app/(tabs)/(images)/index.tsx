import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, useWindowDimensions, View } from 'react-native';

import { ScansStrip } from '@/src/components/home/scans-strip';
import { SeriesListItem } from '@/src/components/images/series-list-item';
import { SeriesSquare } from '@/src/components/images/series-square';
import { SeriesViewer } from '@/src/components/images/series-viewer';
import { PageWrapper } from '@/src/components/layout';
import { Text } from '@/src/components/ui';
import { DESKTOP, TABLET } from '@/src/constants/layout';
import { mockSeries } from '@/src/data/mock-series';
import { isKeyImage } from '@/src/helpers/dicom-series';

export default function ImagesScreen() {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [selectedStudyIndex, setSelectedStudyIndex] = useState(0);
  const [selectedSeriesUid, setSelectedSeriesUid] = useState<string | null>(
    null,
  );
  const [viewerHeight, setViewerHeight] = useState<number | undefined>();
  const scrollRef = useRef<ScrollView>(null);

  const isTabletOrDesktop = width >= TABLET;
  const isDesktop = width >= DESKTOP;
  const sorted = [
    ...mockSeries.filter(isKeyImage),
    ...mockSeries.filter((s) => !isKeyImage(s)),
  ];

  const activeSeries =
    sorted.find((s) => s.seriesInstanceUid === selectedSeriesUid) ??
    sorted[0] ??
    null;

  const selectStudy = (index: number) => {
    setSelectedStudyIndex(index);
    setSelectedSeriesUid(null);
  };

  if (isTabletOrDesktop) {
    return (
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <PageWrapper className="pt-6 px-4">
          <View className="mb-4 gap-1">
            <Text variant="heading">{t('header.images.title')}</Text>
          </View>

          <View className="-ml-4 mb-4">
            <ScansStrip
              activeIndex={selectedStudyIndex}
              onSelect={selectStudy}
            />
          </View>

          <View className="flex-row gap-4">
            <View
              className="flex-1"
              onLayout={(e) => setViewerHeight(e.nativeEvent.layout.height)}
            >
              {activeSeries != null && <SeriesViewer className="flex-1" />}
            </View>

            {sorted.length > 0 && viewerHeight != null && (
              <View
                style={{ height: viewerHeight, width: isDesktop ? 380 : 220 }}
                className="overflow-hidden"
              >
                <ScrollView
                  style={{ flex: 1 }}
                  showsVerticalScrollIndicator={false}
                >
                  <View
                    className={isDesktop ? 'flex-row flex-wrap gap-2' : 'gap-2'}
                  >
                    {sorted.map((s) => (
                      <View
                        key={s.seriesInstanceUid}
                        style={
                          isDesktop
                            ? ({ width: 'calc(50% - 4px)' } as object)
                            : undefined
                        }
                      >
                        <SeriesListItem
                          item={s}
                          isSelected={
                            s.seriesInstanceUid ===
                            activeSeries?.seriesInstanceUid
                          }
                          onPress={() =>
                            setSelectedSeriesUid(s.seriesInstanceUid)
                          }
                        />
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        </PageWrapper>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      ref={scrollRef}
      className="flex-1"
      contentContainerClassName={'pb-28'}
      showsVerticalScrollIndicator={false}
    >
      <PageWrapper className="pt-6">
        <View className="px-4 mb-5 gap-1">
          <Text variant="heading">{t('header.images.title')}</Text>
        </View>

        <View className="mb-4">
          <ScansStrip activeIndex={selectedStudyIndex} onSelect={selectStudy} />
        </View>

        <View className="mx-4 rounded-2xl overflow-hidden bg-viewer-bg">
          {activeSeries != null && <SeriesViewer />}
          {sorted.length > 0 && (
            <View className="bg-black border-t border-white/10">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-2 px-4 py-3"
              >
                {sorted.map((s) => (
                  <SeriesSquare
                    key={s.seriesInstanceUid}
                    item={s}
                    isSelected={
                      s.seriesInstanceUid === activeSeries?.seriesInstanceUid
                    }
                    onPress={() => setSelectedSeriesUid(s.seriesInstanceUid)}
                    size={80}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </PageWrapper>
    </ScrollView>
  );
}
