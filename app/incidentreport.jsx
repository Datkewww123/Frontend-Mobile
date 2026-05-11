import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '../constants/colors';

const issueTypes = [
  { key: 'damage', label: 'Hàng hư hỏng', icon: '💔' },
  { key: 'missing', label: 'Thiếu hàng', icon: '❓' },
  { key: 'wrong', label: 'Sai sản phẩm', icon: '⚠️' },
  { key: 'equipment', label: 'Hỏng thiết bị', icon: '🔧' },
  { key: 'safety', label: 'An toàn', icon: '🚨' },
  { key: 'other', label: 'Khác', icon: '📝' },
];

const recentReports = [
  { id: 1, type: 'Hàng hư hỏng', detail: 'Bánh Quy Hải Hà bị vỡ nát', by: 'Mai', time: '10/05 14:30', status: 'Đã xử lý' },
  { id: 2, type: 'Thiếu hàng', detail: 'Thiếu 2 thùng Coca Cola so với phiếu', by: 'Đức', time: '09/05 09:15', status: 'Đang xem' },
  { id: 3, type: 'Hỏng thiết bị', detail: 'Máy quét mã code LED-03 không hoạt động', by: 'Sơn', time: '08/05 16:45', status: 'Chờ' },
];

export default function IncidentReportScreen() {
  const [selectedType, setSelectedType] = useState('');
  const [detail, setDetail] = useState('');
  const [location, setLocation] = useState('');
  const [showForm, setShowForm] = useState(false);

  const submitReport = () => {
    if (!selectedType || !detail) {
      Alert.alert('Lỗi', 'Vui lòng chọn loại sự cố và nhập mô tả');
      return;
    }
    Alert.alert('Thành công', 'Báo cáo sự cố đã được gửi đến quản lý.');
    setSelectedType('');
    setDetail('');
    setLocation('');
    setShowForm(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Báo cáo sự cố</Text>
        <TouchableOpacity onPress={() => setShowForm(!showForm)}>
          <Text style={styles.addBtn}>{showForm ? '✕' : '+'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>📝 Báo cáo mới</Text>
            <Text style={styles.formLabel}>Loại sự cố:</Text>
            <View style={styles.typeGrid}>
              {issueTypes.map(t => (
                <TouchableOpacity
                  key={t.key}
                  style={[styles.typeBtn, selectedType === t.key && styles.typeBtnActive]}
                  onPress={() => setSelectedType(t.key)}
                >
                  <Text style={styles.typeIcon}>{t.icon}</Text>
                  <Text style={[styles.typeLabel, selectedType === t.key && styles.typeLabelActive]}>
                    {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Vị trí (VD: Kệ 14.07.B)"
              placeholderTextColor="#aaa"
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              style={[styles.input, styles.detailInput]}
              placeholder="Mô tả chi tiết sự cố..."
              placeholderTextColor="#aaa"
              value={detail}
              onChangeText={setDetail}
              multiline
            />
            <TouchableOpacity style={styles.submitBtn} onPress={submitReport}>
              <Text style={styles.submitBtnText}>Gửi báo cáo</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Recent reports */}
        <Text style={styles.sectionTitle}>📋 Các báo cáo gần đây</Text>
        {recentReports.map((report) => (
          <View key={report.id} style={styles.reportCard}>
            <View style={styles.reportHead}>
              <Text style={styles.reportType}>{report.type}</Text>
              <View style={[styles.reportStatus, {
                backgroundColor: report.status === 'Đã xử lý' ? '#e8f5e9' :
                  report.status === 'Đang xem' ? '#fff3e0' : '#f5f5f5'
              }]}>
                <Text style={[styles.reportStatusText, {
                  color: report.status === 'Đã xử lý' ? COLORS.primary :
                    report.status === 'Đang xem' ? '#e65100' : '#888'
                }]}>{report.status}</Text>
              </View>
            </View>
            <Text style={styles.reportDetail}>{report.detail}</Text>
            <Text style={styles.reportMeta}>{report.by} · {report.time}</Text>
          </View>
        ))}
      </ScrollView>
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
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#222' },
  addBtn: { fontSize: 24, fontWeight: '700', color: COLORS.primary },
  scroll: { flex: 1, padding: 16 },
  formCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16,
    borderWidth: 1.5, borderColor: COLORS.accent,
  },
  formTitle: { fontSize: 15, fontWeight: '700', color: '#222', marginBottom: 12 },
  formLabel: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 8 },
  typeGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12,
  },
  typeBtn: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12,
    backgroundColor: '#f5f5f5', flexDirection: 'row', alignItems: 'center', gap: 4,
  },
  typeBtnActive: { backgroundColor: '#e8f5e9', borderWidth: 1, borderColor: COLORS.accent },
  typeIcon: { fontSize: 16 },
  typeLabel: { fontSize: 12, fontWeight: '600', color: '#666' },
  typeLabelActive: { color: COLORS.primary },
  input: {
    backgroundColor: '#f5f5f5', borderRadius: 12, padding: 14, fontSize: 14,
    marginBottom: 10,
  },
  detailInput: { height: 100, textAlignVertical: 'top' },
  submitBtn: {
    backgroundColor: COLORS.primary, borderRadius: 14, padding: 16, alignItems: 'center',
  },
  submitBtnText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#222', marginBottom: 10 },
  reportCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 8,
  },
  reportHead: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6,
  },
  reportType: { fontSize: 13, fontWeight: '700', color: '#222' },
  reportStatus: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  reportStatusText: { fontSize: 11, fontWeight: '600' },
  reportDetail: { fontSize: 12, color: '#666', lineHeight: 18, marginBottom: 6 },
  reportMeta: { fontSize: 11, color: '#aaa' },
});
