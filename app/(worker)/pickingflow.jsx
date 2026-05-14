import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Animated, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {packItem} from '../../constants/services/api'
import { COLORS } from '../../constants/colors';
import StaffBottomNav from '../../components/StaffBottomNav';

const bins = ['BIN-401', 'BIN-402', 'BIN-403', 'BIN-404', 'BIN-405', 'BIN-406'];

export default function PickingFlowScreen() {
  const [submitting, setSubmitting] = useState(false);
  const params = useLocalSearchParams();
  const productIndex = parseInt((params.productIndex || '0'), 10);
  const totalProducts = parseInt((params.totalProducts || '1'), 10);
  const productId = params.productId;
  const productName = params.productName;
  const productSku = params.productSku;
  const productLocation = params.productLocation;
  const productQty = parseInt((params.productQty || '1'), 10);
  const productUnit = params.productUnit;

  const [step, setStep] = useState(1); // 1=scan, 2=qty, 3=bin, 4=map
  const [barcode, setBarcode] = useState('');
  const [scanned, setScanned] = useState(false);
  const [quantity, setQuantity] = useState(productQty);
  const [selectedBin, setSelectedBin] = useState('');
  const [arrived, setArrived] = useState(false);

  const scanAnim = useRef(new Animated.Value(1)).current;
  const flashAnim = useRef(new Animated.Value(0)).current;
  const simulateScan = () => {
    Animated.sequence([
      Animated.timing(scanAnim, { toValue: 0.3, duration: 100, useNativeDriver: true }),
      Animated.timing(scanAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setBarcode(productSku);
      setScanned(true);
    });
  };

  const handleManualScan = () => {
    if (!barcode.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã barcode');
      return;
    }
    setScanned(true);
  };

  const handleNextStep = () => {
    if (step === 1 && !scanned) {
      Alert.alert('Lỗi', 'Vui lòng quét mã sản phẩm trước');
      return;
    }
    if (step === 3 && !selectedBin) {
      Alert.alert('Lỗi', 'Vui lòng chọn bin');
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleArrived = async () => {
    setSubmitting(true);
    try {
        await packItem(productId, selectedBin, quantity);
        // Gọi API thành công → chuyển sang item tiếp theo
        const nextIndex = productIndex + 1;
        if (nextIndex < totalProducts) {
            router.replace({
                pathname: '/pickingflow',
                params: { ...params, productIndex: String(nextIndex) },
            });
        } else {
            router.replace({
                pathname: '/productlist',
                params: { taskId: params.taskId, completed: 'true' },
            });
        }
    } catch (err) {
        Alert.alert('Lỗi', err.message || 'Không thể xác nhận pack hàng');
    } finally {
        setSubmitting(false);
    }
};
  const renderStepIndicator = () => (
    <View style={styles.stepRow}>
      {[1, 2, 3, 4].map((s, i) => (
        <View key={s} style={styles.stepItem}>
          <View style={[styles.stepDot, step >= s && styles.stepActive]}>
            <Text style={[styles.stepDotText, step >= s && styles.stepDotTextActive]}>
              {s === 4 ? '📍' : s}
            </Text>
          </View>
          {i < 3 && <View style={[styles.stepLine, step > s && styles.stepLineActive]} />}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Picking</Text>
          <Text style={styles.headerSub}>Sản phẩm {productIndex + 1}/{totalProducts}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{productSku}</Text>
        </View>
      </View>

      {renderStepIndicator()}

      {/* Content based on step */}
      <View style={styles.content}>
        {/* Step 1: Scanner */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <View style={styles.scannerBox}>
              <Animated.View style={[styles.scanFrame, { opacity: scanAnim }]}>
                <Text style={styles.scanIcon}>📷</Text>
                <Text style={styles.scanHint}>Đưa mã vạch vào khung</Text>
                {/* Scan line animation */}
                <Animated.View style={[styles.scanLine, { opacity: scanAnim.interpolate({
                  inputRange: [0.3, 1], outputRange: [0.3, 1]
                })}]} />
              </Animated.View>
              <Animated.View style={[styles.flashOverlay, { opacity: flashAnim }]} />
            </View>

            {!scanned ? (
              <>
                <TouchableOpacity style={styles.scanBtn} onPress={simulateScan}>
                  <Text style={styles.scanBtnText}>📸 Quét mã</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>— hoặc —</Text>
                <View style={styles.manualRow}>
                  <TextInput
                    style={styles.manualInput}
                    placeholder="Nhập mã barcode..."
                    placeholderTextColor="#aaa"
                    value={barcode}
                    onChangeText={setBarcode}
                  />
                 <TouchableOpacity
                      style={[styles.manualBtn, submitting && { opacity: 0.7 }]}
                      onPress={handleArrived}
                      disabled={submitting}
                  >
                      <Text style={styles.manualBtnText}>
                          {submitting ? 'Đang xác nhận...' : '✅ Xác nhận đã đến & pack hàng'}
                      </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.scanResult}>
                <Text style={styles.scanSuccessIcon}>✅</Text>
                <Text style={styles.scanSuccessText}>Quét thành công!</Text>
                <Text style={styles.scanSku}>Mã: {barcode}</Text>
                <Text style={styles.scanProduct}>{productName}</Text>
                <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
                  <Text style={styles.nextBtnText}>Tiếp theo →</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Step 2: Quantity */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>🔢 Chọn số lượng</Text>
            <View style={styles.qtyCard}>
              <Text style={styles.qtyProduct}>{productName}</Text>
              <Text style={styles.qtySku}>{productSku}</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Text style={styles.qtyBtnIcon}>−</Text>
                </TouchableOpacity>
                <View style={styles.qtyValueBox}>
                  <Text style={styles.qtyValue}>{quantity}</Text>
                  <Text style={styles.qtyUnit}>{productUnit}</Text>
                </View>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Text style={styles.qtyBtnIcon}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
              <Text style={styles.nextBtnText}>Tiếp theo →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 3: Bin */}
        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>📦 Chọn Bin</Text>
            <Text style={styles.stepSub}>Chọn bin để đặt sản phẩm</Text>
            <View style={styles.binGrid}>
              {bins.map(bin => (
                <TouchableOpacity
                  key={bin}
                  style={[styles.binBtn, selectedBin === bin && styles.binBtnActive]}
                  onPress={() => setSelectedBin(bin)}
                >
                  <Text style={styles.binIcon}>📦</Text>
                  <Text style={[styles.binLabel, selectedBin === bin && styles.binLabelActive]}>
                    {bin}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.binInput}
              placeholder="Hoặc nhập mã bin khác..."
              placeholderTextColor="#aaa"
              value={selectedBin}
              onChangeText={setSelectedBin}
            />
            <TouchableOpacity style={styles.nextBtn} onPress={handleNextStep}>
              <Text style={styles.nextBtnText}>Tiếp theo →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 4: Map */}
        {step === 4 && (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>🗺️ Di chuyển đến sản phẩm tiếp theo</Text>
            {!arrived ? (
              <>
                <View style={styles.mapCard}>
                  <Text style={styles.mapEmoji}>📍</Text>
                  <Text style={styles.mapLabel}>Vị trí hiện tại</Text>
                  <View style={styles.mapRoute}>
                    <Text style={styles.mapArrow}>↓</Text>
                    <Text style={styles.mapStep}>Đi thẳng 20m</Text>
                  </View>
                  <View style={styles.mapRoute}>
                    <Text style={styles.mapArrow}>→</Text>
                    <Text style={styles.mapStep}>Rẽ phải, dãy 14</Text>
                  </View>
                  <View style={styles.mapRoute}>
                    <Text style={styles.mapArrow}>↓</Text>
                    <Text style={styles.mapStep}>Kệ 07, tầng B</Text>
                  </View>
                  <View style={[styles.mapDest, { marginTop: 12 }]}>
                    <Text style={styles.mapDestIcon}>🏁</Text>
                    <Text style={styles.mapDestLabel}>{productLocation}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.arriveBtn} onPress={handleArrived}>
                  <Text style={styles.arriveBtnText}>✅ Tôi đã đến vị trí</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        )}
      </View>
        <StaffBottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f4f1' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  backBtn: { fontSize: 28, color: COLORS.primary },
  headerCenter: { flex: 1, marginLeft: 10 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#222' },
  headerSub: { fontSize: 11, color: '#888', marginTop: 2 },
  badge: {
    backgroundColor: '#e8f5e9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  badgeText: { fontSize: 11, fontWeight: '600', color: COLORS.primary },

  // Steps
  stepRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 16, backgroundColor: '#fff',
  },
  stepItem: { flexDirection: 'row', alignItems: 'center' },
  stepDot: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#e0e0e0',
    alignItems: 'center', justifyContent: 'center',
  },
  stepActive: { backgroundColor: COLORS.primary },
  stepDotText: { fontSize: 12, fontWeight: '700', color: '#999' },
  stepDotTextActive: { color: '#fff' },
  stepLine: { width: 40, height: 2, backgroundColor: '#e0e0e0', marginHorizontal: 4 },
  stepLineActive: { backgroundColor: COLORS.primary },

  content: { flex: 1, padding: 16 },
  stepContainer: { flex: 1, justifyContent: 'center' },
  stepTitle: { fontSize: 18, fontWeight: '700', color: '#222', textAlign: 'center', marginBottom: 8 },
  stepSub: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 20 },

  // Scanner
  scannerBox: {
    backgroundColor: '#1a1a1a', borderRadius: 20, height: 280,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    overflow: 'hidden',
  },
  scanFrame: { alignItems: 'center' },
  scanIcon: { fontSize: 60, marginBottom: 12 },
  scanHint: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  scanLine: {
    width: 200, height: 2, backgroundColor: COLORS.accent, marginTop: 20,
    shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, shadowRadius: 10, elevation: 4,
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject, backgroundColor: '#fff',
  },
  scanBtn: {
    backgroundColor: COLORS.primary, borderRadius: 14, padding: 18,
    alignItems: 'center', marginBottom: 10,
  },
  scanBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  orText: { textAlign: 'center', color: '#aaa', fontSize: 13, marginBottom: 10 },
  manualRow: { flexDirection: 'row', gap: 10 },
  manualInput: {
    flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 14,
  },
  manualBtn: {
    backgroundColor: '#e8f5e9', borderRadius: 12, paddingHorizontal: 16,
    justifyContent: 'center',
  },
  manualBtnText: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  scanResult: { alignItems: 'center', padding: 20 },
  scanSuccessIcon: { fontSize: 48, marginBottom: 8 },
  scanSuccessText: { fontSize: 18, fontWeight: '700', color: COLORS.primary, marginBottom: 4 },
  scanSku: { fontSize: 13, color: '#888', marginBottom: 4 },
  scanProduct: { fontSize: 15, fontWeight: '600', color: '#222', marginBottom: 20 },

  // Quantity
  qtyCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center',
    marginBottom: 24,
  },
  qtyProduct: { fontSize: 16, fontWeight: '700', color: '#222', marginBottom: 4 },
  qtySku: { fontSize: 12, color: '#888', marginBottom: 20 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  qtyBtn: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#f5f5f5',
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnIcon: { fontSize: 24, fontWeight: '700', color: COLORS.primary },
  qtyValueBox: { alignItems: 'center', minWidth: 80 },
  qtyValue: { fontSize: 40, fontWeight: '900', color: '#222' },
  qtyUnit: { fontSize: 13, color: '#888', marginTop: 4 },

  // Bin
  binGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 16,
  },
  binBtn: {
    width: '30%', backgroundColor: '#fff', borderRadius: 14, padding: 14,
    alignItems: 'center', gap: 6, borderWidth: 2, borderColor: 'transparent',
  },
  binBtnActive: { borderColor: COLORS.primary, backgroundColor: '#e8f5e9' },
  binIcon: { fontSize: 24 },
  binLabel: { fontSize: 12, fontWeight: '700', color: '#444' },
  binLabelActive: { color: COLORS.primary },
  binInput: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 14, marginBottom: 16,
  },

  // Map
  mapCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 20,
  },
  mapEmoji: { fontSize: 40, textAlign: 'center', marginBottom: 8 },
  mapLabel: { fontSize: 14, fontWeight: '700', color: '#222', textAlign: 'center', marginBottom: 16 },
  mapRoute: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8,
    borderBottomWidth: 0.5, borderBottomColor: '#eee',
  },
  mapArrow: { fontSize: 20, width: 30, textAlign: 'center' },
  mapStep: { fontSize: 13, color: '#666' },
  mapDest: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center' },
  mapDestIcon: { fontSize: 24 },
  mapDestLabel: { fontSize: 16, fontWeight: '800', color: COLORS.primary },

  // Buttons
  nextBtn: {
    backgroundColor: COLORS.primary, borderRadius: 14, padding: 18, alignItems: 'center',
    marginTop: 10,
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  arriveBtn: {
    backgroundColor: COLORS.primary, borderRadius: 14, padding: 18, alignItems: 'center',
    marginTop: 10,
  },
  arriveBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
