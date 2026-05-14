import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import {getAssignedTasks} from '../../constants/services/api'
import { COLORS } from '../../constants/colors';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import StaffBottomNav from '../../components/StaffBottomNav';

const initialProducts = [
  { id: 1, location: '26.10.15', name: 'Bánh Quy Hải Hà 200g', sku: 'KF-00123', qty: 5, unit: 'Hộp', done: true },
  { id: 2, location: '14.07.B', name: 'Nước tương chinsu 500ml', sku: 'KF-00456', qty: 3, unit: 'Chai', done: false },
  { id: 3, location: '17.02.A', name: 'Mì gói hảo hảo tôm 75g', sku: 'KF-00789', qty: 20, unit: 'Gói', done: false },
  { id: 4, location: '22.08.A', name: 'Snack Oshi Tôm 68g', sku: 'KF-01024', qty: 12, unit: 'Gói', done: false },
  { id: 5, location: '09.03.C', name: 'Dầu ăn Neptune 1L', sku: 'KF-01100', qty: 6, unit: 'Chai', done: false },
];

export default function productListScreen() {
  const params = useLocalSearchParams();
  const taskId = params.taskId;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(initialProducts);
  const { userRole } = useAuth();

  useEffect (() =>{
    async function fetchItem() {
      try{
        const res = await getAssignedTasks();
        // Tìm task theo ID để lấy item
        const task = res.find(t => t.id === taskId);
        if(task && task.items){
          const mapped = task.items.map(item => ({
            key : item._id,
            location : item.location || '',
            name : item.productName,
            sku : item.sku,
            qty : item.qty,
            unit : item.unit || 'cái',
            done : item.status === 'Xong'
          }));
          setProducts(mapped);
        }
      }
      catch(err){
        Alert.alert('Lỗi! không tải được danh sách sản phẩm')
      }
      finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [taskId]);

  const doneCount = products.filter(p => p.done).length;
  const remaining = products.length - doneCount;
  const allDone = products.every(p => p.done);

  const startPicking = (item, index) => {
    router.push({
      pathname: '/picking',
      params: {
        productIndex: String(index),
        totalProducts: String(products.length),
        productId: String(item.id),
        productName: item.name,
        productSku: item.sku,
        productLocation: item.location,
        productQty: String(item.qty),
        productUnit: item.unit,
      },
    });
  };

  const confirmOrder = () => {
    Alert.alert(
      'Xác nhận hoàn thành',
      'Bạn đã hoàn thành tất cả sản phẩm. Xác nhận kết thúc đơn hàng?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Hoàn thành',
          onPress: () => {
            const dest = userRole === 'admin' ? '/managerdashboard' : '/dashboard';
            router.replace(dest);
          },
        },
      ]
    );
  };

  function renderItem({ item, index }) {
    return (
      <TouchableOpacity onPress={() => !item.done && startPicking(item, index)} disabled={item.done}>
        <View style={[styles.itemRow, item.done && styles.itemDone]}>
          <View style={styles.locationBox}>
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemSKU}>{item.sku}</Text>
          </View>
          <View style={styles.itemQty}>
            <Text style={styles.qtyValue}>{item.done ? '✓' : item.qty}</Text>
            <Text style={styles.qtyUnit}>{item.unit}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}> ‹ </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>#KF-12345 . Q.7</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{remaining} Còn Lại</Text>
        </View>
      </View>

      {/* Zone Chip */}
      <View style={styles.zoneChip}>
        <Text style={styles.zoneIcon}>🍬</Text>
        <View style={styles.zoneInfo}>
          <Text style={styles.zoneName}>Khu vực Bánh & Kẹo</Text>
          <Text style={styles.zoneSub}>12 sản phẩm thuộc khu vực của bạn</Text>
        </View>
        <View style={styles.zoneProgress}>
          <Text style={styles.zoneProgressVal}>{doneCount}/{products.length}</Text>
          <Text style={styles.zoneProgressLbl}>Đã lấy</Text>
        </View>
      </View>
      {loading ?(
        <ActivityIndicator 
        color = {COLORS.primary}
        size = 'large'
        style = {{marginTop : 40}} />
      ):(
      <FlatList
        data={products}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      )}
      {/* Confirm Order Button */}
      {allDone && (
        <View style={styles.confirmBar}>
          <Text style={styles.confirmText}>✅ Đã hoàn thành tất cả sản phẩm</Text>
          <TouchableOpacity style={styles.confirmBtn} onPress={confirmOrder}>
            <Text style={styles.confirmBtnText}>Xác nhận hoàn thành đơn hàng</Text>
          </TouchableOpacity>
        </View>
      )}
        <StaffBottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f4f1' },
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  backBtn: { fontSize: 28, color: COLORS.primary, marginRight: 10 },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#222' },
  badge: {
    backgroundColor: '#fff3e0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#e65100' },
  zoneChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    margin: 12, padding: 14, borderRadius: 16, gap: 12,
  },
  zoneIcon: { fontSize: 28 },
  zoneInfo: { flex: 1 },
  zoneName: { fontSize: 14, fontWeight: '700', color: '#222' },
  zoneSub: { fontSize: 12, color: '#888', marginTop: 2 },
  zoneProgress: { alignItems: 'center' },
  zoneProgressVal: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  zoneProgressLbl: { fontSize: 11, color: '#888' },
  list: { padding: 12, gap: 8 },
  itemRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 14, padding: 12, gap: 12, borderWidth: 1.5, borderColor: 'transparent',
  },
  itemDone: { opacity: 0.45 },
  locationBox: {
    backgroundColor: COLORS.primary, borderRadius: 10, padding: 8,
    alignItems: 'center', minWidth: 52,
  },
  locationText: { color: '#fff', fontSize: 11, fontWeight: '700', textAlign: 'center' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 13, fontWeight: '600', color: '#222' },
  itemSku: { fontSize: 11, color: '#888', marginTop: 3 },
  itemQty: { alignItems: 'center' },
  qtyValue: { fontSize: 20, fontWeight: '800', color: COLORS.primary },
  qtyUnit: { fontSize: 11, color: '#888' },
  confirmBar: {
    padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', gap: 10,
  },
  confirmText: { fontSize: 14, fontWeight: '700', color: COLORS.primary, textAlign: 'center' },
  confirmBtn: {
    backgroundColor: COLORS.primary, borderRadius: 14, padding: 16, alignItems: 'center',
  },
  confirmBtnText: { color: '#fff', fontSize: 15, fontWeight: '800' },
});
