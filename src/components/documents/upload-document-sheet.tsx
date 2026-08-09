import * as DocumentPicker from 'expo-document-picker';
import { BottomSheet } from 'heroui-native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Platform, Pressable, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Button, Icon, Text } from '@/src/components/ui';
import { DOC_TYPES, type DocType } from '@/src/constants/document';
import { fileExtLabel, formatBytes } from '@/src/helpers/file';
import type { PickedFile } from '@/src/types/domain';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: PickedFile[], type: DocType) => void;
};

export function UploadDocumentSheet({ isOpen, onClose, onUpload }: Props) {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<DocType>('report');
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [sheetOpen, setSheetOpen] = useState(isOpen);
  useEffect(() => {
    setSheetOpen(isOpen);
  }, [isOpen]);
  const textColor = String(useCSSVariable('--color-text'));

  async function handlePickFiles() {
    if (Platform.OS !== 'web') {
      setSheetOpen(false);
      await new Promise<void>((r) => setTimeout(r, 400));
    }
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/jpeg', 'image/png', 'application/dicom', '*/*'],
      multiple: true,
      copyToCacheDirectory: false,
    });
    if (Platform.OS !== 'web') setSheetOpen(true);
    if (result.canceled) return;
    const picked: PickedFile[] = result.assets.map((a) => ({
      uri: a.uri,
      name: a.name,
      size: a.size ?? 0,
      mimeType: a.mimeType,
    }));
    setFiles((prev) => [...prev, ...picked]);
  }

  function removeFile(uri: string) {
    setFiles((prev) => prev.filter((f) => f.uri !== uri));
  }

  const content = (
    <View className="gap-5">
      <View className="gap-1">
        <Text variant="overline" color="muted" className="uppercase pb-2">
          {t('document.upload.subtitle')}
        </Text>
        <Text variant="heading">{t('document.upload.heading')}</Text>
      </View>

      <View className="flex-row flex-wrap gap-2">
        {DOC_TYPES.map((type) => {
          const isSelected = selectedType === type;
          return (
            <Pressable
              key={type}
              onPress={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full border ${isSelected ? 'bg-primary border-primary' : 'bg-surface border-neutral-gray'}`}
            >
              <Text
                variant="caption"
                className={`font-sans-semibold ${isSelected ? 'text-white' : ''}`}
              >
                {t(`document.upload.type_${type}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={handlePickFiles}
        className="rounded-[24px] border border-dashed border-neutral-gray items-center justify-center gap-2 py-10 px-6 bg-white"
      >
        <View className="w-12 h-12 rounded-2xl bg-neutral-gray/[0.24] items-center justify-center mb-1">
          <Icon name="upload" size={24} color={textColor} />
        </View>
        <Text variant="label" className="text-center">
          {t('document.upload.drop_title')}
        </Text>
        <Text variant="caption" color="muted" className="text-center">
          {t('document.upload.drop_hint')}
        </Text>
      </Pressable>

      {files.length > 0 && (
        <View className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text variant="label">
              {t('document.upload.files_selected', { count: files.length })}
            </Text>
            <Pressable onPress={() => setFiles([])}>
              <Text variant="caption" color="muted">
                {t('document.upload.clear_all')}
              </Text>
            </Pressable>
          </View>

          <View className="rounded-[24px] border border-neutral-gray bg-white overflow-hidden">
            {files.map((file, i) => (
              <View
                key={file.uri}
                className={`flex-row items-center gap-3 px-4 py-3${i < files.length - 1 ? ' border-b border-neutral-gray' : ''}`}
              >
                <View className="w-8 h-8 rounded-xl bg-neutral-gray/[0.24] items-center justify-center shrink-0">
                  <Text variant="overline" color="muted">
                    {fileExtLabel(file.name, file.mimeType)}
                  </Text>
                </View>
                <View className="flex-1 min-w-0">
                  <Text variant="label" numberOfLines={1}>
                    {file.name}
                  </Text>
                  <Text variant="caption" color="muted" className="mt-1">
                    {formatBytes(file.size)}
                  </Text>
                </View>
                <Pressable
                  onPress={() => removeFile(file.uri)}
                  accessibilityRole="button"
                  className="p-1"
                >
                  <Icon name="x" size={20} color={textColor} />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      )}

      <View className="flex-row gap-3">
        <Button
          variant="secondary"
          onPress={() => {
            setFiles([]);
            onClose();
          }}
          className="flex-1 bg-white border-primary"
        >
          <Button.Label className="text-primary">{t('common.cancel')}</Button.Label>
        </Button>
        <Button
          variant="primary"
          onPress={() => {
            onUpload(files, selectedType);
            setFiles([]);
            onClose();
          }}
          isDisabled={files.length === 0}
          className="flex-1 bg-primary"
        >
          <Button.Label className="text-white">{t('document.upload.action')}</Button.Label>
        </Button>
      </View>
    </View>
  );

  if (Platform.OS === 'web') {
    if (!isOpen) return null;
    return (
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Pressable
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            onPress={onClose}
          />
          <View
            className="bg-surface rounded-3xl p-6"
            style={{ width: 520, zIndex: 1, maxHeight: '90%' }}
          >
            <View className="flex-row items-center justify-between mb-1">
              <View />
              <Pressable onPress={onClose} className="p-1 rounded-full bg-surface-subtle">
                <Icon name="x" size={18} color={textColor} />
              </Pressable>
            </View>
            {content}
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <BottomSheet
      isOpen={sheetOpen}
      onOpenChange={(open) => {
        setSheetOpen(open);
        if (!open) {
          setFiles([]);
          onClose();
        }
      }}
    >
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
          <View className="flex-1 gap-5">{content}</View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
