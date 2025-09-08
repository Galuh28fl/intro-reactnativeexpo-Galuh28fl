import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  // Data dummy untuk FlatList (50 item)
  const courses = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Mata Kuliah #${i + 1}`,
        note: i % 2 === 0 ? "Wajib" : "Pilihan",
      })),
    []
  );

  const renderCourse = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listTitle}>{item.title}</Text>
      <Text style={styles.listNote}>{item.note}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ====== View & Text ====== */}
        <View style={styles.card}>
          <Text style={styles.h1}>Komponen Dasar React Native</Text>
          <Text style={styles.p}>
            Ini adalah contoh penggunaan <Text style={styles.code}>View</Text> sebagai
            wadah layout dan <Text style={styles.code}>Text</Text> untuk menampilkan
            tulisan. Gaya diterapkan via <Text style={styles.code}>StyleSheet</Text>.
          </Text>
          <Text style={styles.pSmall}>
            Platform: <Text style={styles.bold}>{Platform.OS}</Text>
          </Text>
        </View>

        {/* ====== Image ====== */}
        <View style={styles.card}>
          <Text style={styles.h2}>Image</Text>
          <Text style={styles.p}>
            Gambar di bawah diambil dari internet (Picsum). Pastikan perangkat
            Anda terhubung ke internet.
          </Text>

          <Image
            // Remote image; bisa diganti sesuai kebutuhan
            source={{ uri: "https://picsum.photos/seed/rn-basic/800/400" }}
            style={styles.heroImage}
            resizeMode="cover"
            accessibilityLabel="Contoh gambar lanskap dari Picsum"
          />

          {/* ScrollView horizontal sebagai galeri mini */}
          <Text style={[styles.pSmall, { marginTop: 12 }]}>
            Galeri (ScrollView horizontal):
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gallery}
          >
            {["one", "two", "three", "four", "five"].map((key) => (
              <Image
                key={key}
                source={{ uri: `https://picsum.photos/seed/${key}/200/130` }}
                style={styles.thumb}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>

        {/* ====== Button ====== */}
        <View style={styles.card}>
          <Text style={styles.h2}>Button</Text>
          <Text style={styles.p}>
            Tekan tombol untuk mengubah state sederhana. Ini contoh interaksi
            dasar dengan <Text style={styles.code}>Button</Text>.
          </Text>

          <View style={styles.rowBetween}>
            <Text style={styles.counterText}>Ditekan: {count}x</Text>
            <Button title="Tambah" onPress={() => setCount((c) => c + 1)} />
          </View>
        </View>

        {/* ====== ScrollView ====== */}
        <View style={styles.card}>
          <Text style={styles.h2}>ScrollView (vertikal)</Text>
          <Text style={styles.p}>
            Anda sedang menggulir seluruh halaman ini menggunakan{" "}
            <Text style={styles.code}>ScrollView</Text>. Cocok untuk konten yang
            panjang tetapi tidak terlalu banyak item data.
          </Text>
        </View>

        {/* ====== FlatList ====== */}
        <View style={styles.card}>
          <Text style={styles.h2}>FlatList</Text>
          <Text style={styles.p}>
            <Text style={styles.code}>FlatList</Text> dioptimalkan untuk daftar data
            panjang (virtualized). Di bawah ini kita tampilkan 50 item.
          </Text>

          {/* Agar bisa discroll di dalam ScrollView, aktifkan nestedScrollEnabled */}
          <FlatList
            data={courses}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderCourse}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <Text style={styles.pSmall}>Belum ada data mata kuliah.</Text>
            }
            style={styles.flatList}
            nestedScrollEnabled
            // batasi tinggi supaya terlihat sebagai panel list tersendiri
          />
          <Text style={styles.pSmall}>
            Catatan: di proyek nyata, hindari menaruh FlatList di dalam
            ScrollView. Di contoh ini kita aktifkan{" "}
            <Text style={styles.code}>nestedScrollEnabled</Text> agar tetap bisa
            diuji.
          </Text>
        </View>

        {/* ====== Penutup ====== */}
        <View style={[styles.card, { marginBottom: 40 }]}>
          <Text style={styles.h2}>StyleSheet</Text>
          <Text style={styles.p}>
            Semua gaya di aplikasi ini didefinisikan lewat{" "}
            <Text style={styles.code}>StyleSheet.create()</Text> di bagian bawah
            file. Ini praktik umum agar performa dan keterbacaan lebih baik.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f172a" }, // slate-900
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  h1: { fontSize: 22, fontWeight: "800", marginBottom: 8, color: "#0f172a" },
  h2: { fontSize: 18, fontWeight: "700", marginBottom: 8, color: "#0f172a" },
  p: { fontSize: 14, lineHeight: 20, color: "#334155" },
  pSmall: { fontSize: 12, lineHeight: 18, color: "#64748b" },
  bold: { fontWeight: "700" },
  code: {
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  heroImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginTop: 8,
  },
  gallery: { gap: 8, paddingVertical: 8 },
  thumb: {
    width: 140,
    height: 90,
    borderRadius: 10,
  },
  rowBetween: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  counterText: { fontSize: 16, fontWeight: "700", color: "#0f172a" },
  flatList: {
    maxHeight: 360,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
  },
  listItem: {
    padding: 12,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
  },
  listTitle: { fontSize: 14, fontWeight: "700", color: "#0f172a" },
  listNote: { fontSize: 12, color: "#64748b" },
  separator: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 12,
  },
});