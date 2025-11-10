import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Wallpaper } from '../types';
import { useUserStore } from '../store/userStore';
import { useThemeStore } from '../store/themeStore';
import { getGradientForTheme, getTextColorForTheme } from '../theme/colors';
import { FONT_SIZES, SPACING } from '../theme/typography';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - SPACING.xl * 3) / 2;

// Sample wallpapers - in production, these would come from an API
const SAMPLE_WALLPAPERS: Wallpaper[] = [
  {
    id: '1',
    url: 'https://picsum.photos/1080/1920?random=1',
    thumbnailUrl: 'https://picsum.photos/400/600?random=1',
    unlockDate: new Date(),
    isNew: true,
    gradient: ['#26436B', '#3d5a8c'],
  },
  {
    id: '2',
    url: 'https://picsum.photos/1080/1920?random=2',
    thumbnailUrl: 'https://picsum.photos/400/600?random=2',
    unlockDate: new Date(Date.now() - 86400000),
    isNew: false,
    gradient: ['#667eea', '#764ba2'],
  },
  {
    id: '3',
    url: 'https://picsum.photos/1080/1920?random=3',
    thumbnailUrl: 'https://picsum.photos/400/600?random=3',
    unlockDate: new Date(Date.now() - 86400000 * 2),
    isNew: false,
    gradient: ['#4facfe', '#00f2fe'],
  },
];

export default function WallpapersScreen() {
  const [wallpapers] = useState<Wallpaper[]>(SAMPLE_WALLPAPERS);
  const { user, saveWallpaper } = useUserStore();
  const { currentTheme } = useThemeStore();

  const gradientColors = getGradientForTheme(currentTheme);
  const textColor = getTextColorForTheme(currentTheme);

  const handleDownload = async (wallpaper: Wallpaper) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant photo library access to save wallpapers.'
        );
        return;
      }

      Alert.alert('Downloading...', 'Saving wallpaper to your device.');

      const fileUri = FileSystem.documentDirectory + `wallpaper-${wallpaper.id}.jpg`;
      const downloadResult = await FileSystem.downloadAsync(wallpaper.url, fileUri);

      if (downloadResult.status === 200) {
        const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
        await MediaLibrary.createAlbumAsync('Elevenstoic', asset, false);
        await saveWallpaper(wallpaper.id);

        Alert.alert(
          'Success!',
          'Wallpaper saved to your photo library in the Elevenstoic album.'
        );
      }
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
      Alert.alert('Error', 'Failed to download wallpaper. Please try again.');
    }
  };

  const renderWallpaper = ({ item }: { item: Wallpaper }) => {
    const isSaved = user?.savedWallpapers.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.wallpaperCard}
        onPress={() => handleDownload(item)}
      >
        <Image source={{ uri: item.thumbnailUrl }} style={styles.wallpaperImage} />
        {item.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
        {isSaved && (
          <View style={styles.savedBadge}>
            <Text style={styles.savedBadgeText}>✓</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.wallpaperOverlay}
        >
          <Text style={styles.downloadText}>Download</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Wallpapers</Text>
        <Text style={[styles.headerSubtitle, { color: textColor }]}>
          New wallpaper unlocks daily
        </Text>
      </View>

      <FlatList
        data={wallpapers}
        renderItem={renderWallpaper}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    opacity: 0.7,
  },
  grid: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  wallpaperCard: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  wallpaperImage: {
    width: '100%',
    height: '100%',
  },
  wallpaperOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    alignItems: 'center',
  },
  downloadText: {
    color: '#fff',
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  newBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: '#fff',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newBadgeText: {
    color: '#26436B',
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
  },
  savedBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedBadgeText: {
    color: '#fff',
    fontSize: FONT_SIZES.xs,
  },
});
