# Error Mesajları Kullanım Analizi

Kod değiştirilmedi. Frontend ve backend hata akışları ile `errorMessages.js` importları incelendi.

## A — Error mesajı eksik olan yerler

### 1. Form ve kayıt işlemlerinde genel istek hataları

**Dosyalar:**

- `client/src/components/shared/AddBook.jsx`
- `client/src/components/detailsScreen/EditDetails.jsx`
- `client/src/components/detailsScreen/AddNote.jsx`
- `client/src/components/detailsScreen/EditNote.jsx`
- `client/src/components/shared/PositionUpdatePopup.jsx`
- `client/src/pages/EditProfileScreen.jsx`
- `client/src/pages/ChangeEmailAddressScreen.jsx`
- `client/src/pages/ChangePasswordScreen.jsx`
- `client/src/pages/ForgotPasswordScreen.jsx`
- `client/src/pages/CreateNewPasswordScreen.jsx`
- `client/src/pages/LoginScreen.jsx`
- `client/src/pages/RegisterScreen.jsx`

**Eksik:** Catch blokları çoğunlukla yalnızca `error.errors` alanını forma aktarıyor. Backend’in alan bazlı validation yanıtları gösteriliyor; ancak ağ hatası veya alan hatası içermeyen sunucu hatasında `errors` boş kalıyor. Backend yanıtındaki `message` arayüzde gösterilmediğinden işlem kullanıcıya açıklama vermeden başarısız oluyor.

**Minimum çözüm:** Alan hataları yoksa genel hata mesajını formda göstermek.

### 2. Silme işlemlerindeki API hataları

**Dosyalar ve işlemler:**

- `client/src/pages/HomeScreen.jsx` — birden fazla kitabı silme
- `client/src/components/detailsScreen/DetailsHeader.jsx` — kitap silme
- `client/src/components/detailsScreen/EditNote.jsx` — not silme
- `client/src/components/detailsScreen/ReadingActivityCard.jsx` — okuma aktivitesi silme
- `client/src/pages/ConfirmDeleteAccountScreen.jsx` — hesabı silme

**Eksik:** Başarısızlıklar yalnızca konsola yazılıyor veya hata state’i ekrana bağlanmıyor. Onay popup’ı açık kalabildiği için kullanıcı silmenin gerçekleşmediğini görünür bir açıklama olmadan fark ediyor.

**Minimum çözüm:** Silme başarısızlığında popup/form içinde genel veya backend’den gelen hata mesajını göstermek.

### 3. Hesap silme e-postası isteği

**Dosya/fonksiyon:** `client/src/pages/EditProfileScreen.jsx` — `handleRequestDeleteAccount`

**Eksik:** İstek başarısız olursa yalnızca konsola yazılıyor; popup kapanıyor ve kullanıcı onay e-postasının gönderilemediğini göremiyor.

**Minimum çözüm:** Popup’ta veya ekranda başarısızlık mesajı göstermek ve başarısızlık durumunu kullanıcıya görünür bırakmak.

### 4. Google giriş/kayıt penceresi hataları

**Dosyalar:**

- `client/src/pages/LoginScreen.jsx` — Google giriş `onError`
- `client/src/pages/RegisterScreen.jsx` — Google kayıt `onError`

**Eksik:** `onError` yalnızca konsola yazıyor. Başarısız Google popup akışında kullanıcıya mesaj gösterilmiyor. OAuth isteğinin `onSuccess` içindeki API hatalarında mevcut genel mesaj fallback’i var; eksik olan pencere hatası callback’i.

**Minimum çözüm:** `onError` durumunda görünür genel hata mesajı göstermek.

### 5. Kitap listesinin yüklenmesi

**Dosya/fonksiyon:** `client/src/context/BookContext.jsx` — `getBooks`

**Eksik:** `getBooks` başarısız olduğunda hata konsola yazılıyor, kitap listesi boşaltılıyor ve yükleme tamamlanıyor. Kullanıcı hata mesajı yerine boş kütüphane görebilir.

**Minimum çözüm:** Yükleme hatasını arayüzde göstermek; boş listeyle hata durumunu ayırt etmek.

### 6. Hesap silme bağlantısının doğrulanması başarısızlığı

**Dosya/fonksiyon:** `client/src/pages/ConfirmDeleteAccountScreen.jsx` — `verifyToken`

**Eksik:** Hata `error.errors` üzerinden saklanıyor, fakat ekranda yalnızca `errors.link` ele alınıyor. Ağ/sunucu hatası `link` alanı içermiyorsa kullanıcı hata görmeden hesap silme onay ekranına geçebiliyor.

**Minimum çözüm:** Token doğrulaması genel bir nedenle başarısız olduğunda bunu ekranda belirtmek ve doğrulanmamış bağlantı için onay akışını sürdürmemek.

### 7. Şifre sıfırlama bağlantısının doğrulanması başarısızlığı

**Dosya/fonksiyon:** `client/src/pages/CreateNewPasswordScreen.jsx` — `verifyToken`

**Eksik:** `errors.link` dışındaki doğrulama hataları görünür değil; genel istek hatasında kullanıcı şifre oluşturma formunu görebiliyor.

**Minimum çözüm:** Token doğrulaması genel bir nedenle başarısız olduğunda hata mesajı göstermek ve formu doğrulama başarılı olmadan sunmamak.

## B — `errorMessages.js` import problemleri

İncelenen importlarda **var olmayan bir named export, yanlış relative path veya export şekliyle uyuşmayan syntax bulunmadı**. `errorMessages.js` tarafından import edilen isimler tanımlı ve named export olarak kullanılmaya uygun.

### `TOTAL_PAGES_ERRORS.REQUIRED` tanımsız

**Dosya:** `client/src/utils/validators/validateAddBook.js` (toplam sayfa kontrolü)

**Import edilen değer:** `TOTAL_PAGES_ERRORS`

**Problem:** `TOTAL_PAGES_ERRORS` importu geçerli; ancak `errorMessages.js` içindeki bu nesnede `REQUIRED` alanı yok. Yalnızca `INVALID` ve `TOO_LOW` tanımlı. Toplam sayfa boş bırakıldığında validator `undefined` hata değeri üretebiliyor ve alan hata bileşeni bunu göstermiyor.

**Minimum çözüm:** Kullanılan property ile export tanımını uyumlu hale getirmek.

Importların diğer kullanım yerlerinde typo veya bulunmayan mesaj sabiti tespit edilmedi.

## C — İncelenmesi gerekenler

- `client/src/context/authContext.jsx` başlangıçtaki `getUser` hatasını konsola yazıyor; `401` durumunda oturumu kapatıyor. Diğer hata türlerinde uygulamanın yükleme/yönlendirme davranışının kullanıcıya hata gösterme gerektirip gerektirmediği yalnızca bu akıştan kesin değil.
- Backend’deki Cloudinary temizleme hataları ve sunucu başlangıç hataları konsola yazılıyor. Bunlar kullanıcı tarafından başlatılan doğrudan bir arayüz işlemi olmadığı için eksik hata mesajı bulgularına dahil edilmedi.
- Anlamlı biçimde gösterilen alan validation mesajları ve Google OAuth API catch’lerindeki mevcut fallback mesajı eksik olarak raporlanmadı.
