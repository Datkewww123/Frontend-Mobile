# KingfoodWMS 🏬📦

Hệ thống quản lý kho (Warehouse Management System) dành cho **Kingfood** — chuỗi siêu thị thực phẩm. Ứng dụng mobile giúp nhân viên kho thực hiện các tác vụ **picking, packing, kiểm kê, bàn giao ca** và quản lý đội nhóm ngay trên thiết bị di động.

## Tính năng chính

- **Đăng nhập & phân khu** — Chọn khu vực làm việc (Bánh kẹo, Đồ uống, Hoá phẩm, KM...)
- **Dashboard nhân viên** — Xem KPI cá nhân (đơn hàng, tỷ lệ hoàn thành, SKU/h), danh sách đơn hàng trong ca kèm tiến độ
- **Dashboard quản lý** — Tổng quan SKU đã pick, nhân viên đang làm, báo thiếu, đơn tồn
- **Picking (lấy hàng)** — Duyệt danh sách sản phẩm theo đơn hàng, xác nhận từng SKU
- **Packing (đóng gói)** — Quét/thao tác đóng gói theo bin, kiểm tra số lượng thực tế
- **Kiểm kê thùng (Container Audit)** — So sánh số lượng yêu cầu vs thực tế trong từng BIN
- **Search SKU** — Tra cứu nhanh sản phẩm theo tên hoặc mã SKU
- **Team view** — Xem trạng thái làm việc của các thành viên trong khu vực
- **Bàn giao ca** — Ghi chú bàn giao giữa các ca làm việc
- **Lịch sử hoạt động** — Filter theo trạng thái (đã pick, báo thiếu, move)
- **Bản đồ kho** — Sơ đồ 2D vị trí các kệ hàng
- **Tác vụ phụ trợ** — Báo thiếu hàng, chuyển hàng (move), nhập tay, quét container, báo lỗi pick

## Công nghệ sử dụng

| Công nghệ | Mục đích |
|---|---|
| [React Native](https://reactnative.dev/) 0.81 | Framework mobile |
| [Expo](https://expo.dev/) SDK 54 | Build tool & runtime |
| [Expo Router](https://docs.expo.dev/router/introduction/) v4 | File-based routing |
| [React Navigation](https://reactnavigation.org/) | Bottom tabs, stack |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Animation |
| [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) | Gesture handling |
| TypeScript | Type safety |

## Cấu trúc thư mục

```
KingfoodWMS/
├── app/                    # File-based routing screens
│   ├── _layout.tsx         # Root layout + auth guard
│   ├── index.tsx           # Redirect → /Login
│   ├── Login.jsx
│   ├── dashboard.jsx       # Employee dashboard
│   ├── managerdashboard.jsx
│   ├── productlist.jsx     # Picking list
│   ├── packing.jsx         # Packing screen
│   ├── skusearch.jsx
│   ├── team.jsx
│   ├── handover.jsx        # Shift handover
│   ├── history.jsx         # Activity history
│   ├── warehousemap.jsx    # Warehouse 2D map
│   ├── containeraudit.jsx  # Bin audit
│   ├── missingitem.jsx
│   ├── moveitem.jsx
│   ├── manualentry.jsx
│   ├── scancontainer.jsx
│   ├── pickingerror.jsx
│   ├── endshelf.jsx
│   ├── notifications.jsx
│   ├── offline.jsx
│   ├── profile.jsx
│   └── setting.jsx
├── components/             # Shared UI components
│   ├── FloatingAssistiveButton.jsx
│   ├── ui/                 # Atomic UI components
│   └── ...
├── contexts/
│   └── AuthContext.tsx      # Auth state management
├── constants/
│   ├── colors.ts           # Brand colors (Kingfood green)
│   └── theme.ts            # Light/dark theme tokens
├── assets/
├── hooks/
└── app.json
```

## Cài đặt & Chạy

```bash
# 1. Cài dependencies
npm install

# 2. Khởi động Expo dev server
npx expo start

# 3. Chạy trên thiết bị cụ thể
npm run android   # Android emulator / thiết bị thật
npm run ios       # iOS simulator (macOS)
npm run web       # Web browser
```

## Yêu cầu hệ thống

- Node.js 18+
- Expo CLI
- Android Studio (cho Android emulator) hoặc Xcode (cho iOS simulator)
- Thiết bị thật với Expo Go (tuỳ chọn)

## Màu sắc thương hiệu

Bảng màu chủ đạo lấy cảm hứng từ xanh lá Kingfood:

| Vai trò | Mã màu |
|---|---|
| Primary | `#1b5e3b` |
| Primary Light | `#2e7d32` |
| Accent | `#4caf50` |
| Success | `#4caf50` |
| Warning | `#ff9800` |
| Error | `#e53935` |

## Giấy phép

Dự án nội bộ — Kingfood.
