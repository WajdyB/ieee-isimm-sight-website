# Committee Members - Information to Complete

Please fill in the following information for each committee member in `lib/images.ts`:

---

## 1. Wassim Zili - Chairman ✅
- **Image**: ✅ `/images/committee/wassim_zili.PNG`
- **Position Title**: ✅ Chairman
- **Email**: ❌ TODO: Verify email (currently: wassim.zili@ieee.org)
- **Facebook**: ❌ TODO: Add Facebook profile link
- **LinkedIn**: ❌ TODO: Add LinkedIn profile link

---

## 2. Mohamed Sadok Bouslama - Vice Chair ✅
- **Image**: ✅ `/images/committee/mohamed_sadok_bouslama.png`
- **Position Title**: ✅ Vice Chair
- **Email**: ❌ TODO: Verify email (currently: mohamed.bouslama@ieee.org)
- **Facebook**: ❌ TODO: Add Facebook profile link
- **LinkedIn**: ❌ TODO: Add LinkedIn profile link

---

## 3. Maram Baccouche - Secretary ✅
- **Image**: ✅ `/images/committee/maram_baccouche.png`
- **Position Title**: ✅ Secretary
- **Email**: ❌ TODO: Verify email (currently: maram.baccouche@ieee.org)
- **Facebook**: ❌ TODO: Add Facebook profile link
- **LinkedIn**: ❌ TODO: Add LinkedIn profile link

---

## 4. Hamza Khadija - Treasurer ✅
- **Image**: ✅ `/images/committee/hamza_khadija.png`
- **Position Title**: ✅ Treasurer
- **Email**: ❌ TODO: Verify email (currently: hamza.khadija@ieee.org)
- **Facebook**: ❌ TODO: Add Facebook profile link
- **LinkedIn**: ❌ TODO: Add LinkedIn profile link

---

## 5. Mahmoud Balbali - Webmaster ✅
- **Image**: ✅ `/images/committee/mahmoud_balbali.PNG`
- **Position Title**: ✅ Webmaster
- **Email**: ❌ TODO: Verify email (currently: mahmoud.balbali@ieee.org)
- **Facebook**: ❌ TODO: Add Facebook profile link
- **LinkedIn**: ❌ TODO: Add LinkedIn profile link

---

## 6. Amani Rais - HR Manager ✅
- **Image**: ✅ `/images/committee/amani_rais.png`
- **Position Title**: ✅ HR Manager
- **Email**: ❌ TODO: Verify email (currently: amani.rais@ieee.org)
- **Facebook**: ❌ TODO: Add Facebook profile link
- **LinkedIn**: ❌ TODO: Add LinkedIn profile link

---

## 7. Saif Balbali - Project Coordinator ✅
- **Image**: ✅ `/images/committee/saif_balbali.png`
- **Position Title**: ✅ Project Coordinator
- **Email**: ❌ TODO: Verify email (currently: saif.balbali@ieee.org)
- **Facebook**: ❌ TODO: Add Facebook profile link
- **LinkedIn**: ❌ TODO: Add LinkedIn profile link

---

## Additional Updates Needed

### Chairman's Message Section
- **Chair Photo**: ✅ Updated to Wassim Zili
- **Chair Name**: ✅ Updated to "Wassim Zili"

---

## How to Update

1. Open `lib/images.ts`
2. Find each member in the `members` array
3. Replace the placeholder values with actual information:
   - `position: "Position Title"` → Replace with actual position
   - `email: "..."` → Verify or update email address
   - `facebook: ""` → Add Facebook profile URL
   - `linkedin: ""` → Add LinkedIn profile URL

### Example:
```typescript
{
  name: "Amani Rais",
  position: "Vice Chair", // Updated
  image: "/images/committee/amani_rais.png", 
  facebook: "https://www.facebook.com/amani.rais", // Updated
  email: "amani.rais@ieee.org",
  linkedin: "https://www.linkedin.com/in/amani-rais", // Updated
},
```

---

## Notes
- All committee member images are already loaded from `/public/images/committee/`
- The website will display all 7 members on the Leadership Team page
- Social media icons will only be clickable once you add the links
- Empty LinkedIn or Facebook fields will still show icons but won't be functional
