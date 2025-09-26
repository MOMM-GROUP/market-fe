import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// COSMOS certified products data
const cosmosProductsData = `Commercial name,COSMOS Signature,Brand name,Company name,Certified by,Version
A9282 - Viking Beauty Exfoliating Face Scrub,ORGANIC,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
A9285 - Viking Beauty Reviving Day cream,ORGANIC,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
A9286 - Viking Beauty Reviving Night cream,ORGANIC,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
A9287 - Viking Beauty Revitalizing Eye Cream,ORGANIC,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
A9288 - Viking Beauty Glow Facial Oil,ORGANIC,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
A9289 - Viking Beauty Foam Cleanser,NATURAL,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
Active Algae Balancing Probiotic Mask -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Active Algae Calming Cleansing Balm -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Active Algae Lightweight Moisturizer -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Active Algae Minty Mist -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Active Algae Sustainability Set,ORGANIC,KORA ORGANICS BY MIRANDA KERR PTY LTD,KORA US LLC,ECOCERT GREENLIFE,3.1
Active Algae Sustainability Set,ORGANIC,KORA US LLC,KORA US LLC,ECOCERT GREENLIFE,3.1
Active Oil Free Moisturiser (99% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
ANTIOXIDANT HYDRATING TONER,ORGANIC,Ki'olal Biocosmetics,KIOLA,ECOCERT GREENLIFE,4.1
"Baby Body Wash (78.06%, 99.4% Nat)",ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
"Baby Shampoo (77.76% Org, 99.40% Nat)",ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
Baked FDT M/Dark,NATURAL,ANTONYM COSMETICS LLC,"ANTONYM COSMETICS, LLC",ECOCERT GREENLIFE,3.1
BAKED FTD DARK,NATURAL,ANTONYM COSMETICS LLC,"ANTONYM COSMETICS, LLC",ECOCERT GREENLIFE,3.1
BAKED FTD FAIR,NATURAL,ANTONYM COSMETICS LLC,"ANTONYM COSMETICS, LLC",ECOCERT GREENLIFE,3.1
BAKED FTD LIGHT,NATURAL,ANTONYM COSMETICS LLC,"ANTONYM COSMETICS, LLC",ECOCERT GREENLIFE,3.1
BAKED FTD NUDE,NATURAL,ANTONYM COSMETICS LLC,"ANTONYM COSMETICS, LLC",ECOCERT GREENLIFE,3.1
Balancing 2 in 1 Facial Mask and Exfoliator -- ACNE OILY SKIN -YLANG YLANG,ORGANIC,Andrew International LLC,Andrew International LLC,ECOCERT GREENLIFE,3.1
Balancing Facial Cream Ylang Ylang -- ACNE OILY SKIN-YLANG YLANG,ORGANIC,Andrew International LLC,Andrew International LLC,ECOCERT GREENLIFE,3.1
Bebe Essentials Gift Set -- Bebe,ORGANIC,Chantecaille,CHANTECAILLE BEAUTE INC,ECOCERT GREENLIFE,3.1
Berry Bright Vitamin C Eye Cream,ORGANIC,KORA US LLC,KORA US LLC,ECOCERT GREENLIFE,4.1
Bio-Barrier Eye Creme,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Bio-Barrier Eye Creme 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Bio-Barrier Serum,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Bio-Shield Face Oil,NATURAL,TATA'S NATURAL ALCHEMY,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Body Dry Oil Fragrance Free / Huile Sèche Corps Sans Parfum,ORGANIC,NERRA,Nerra Inc,ECOCERT GREENLIFE,4.1
Boosted Contouring Eye Balm 3.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Boosted Contouring Serum,NATURAL,TATA'S NATURAL ALCHEMY,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Botanical A Bio Retinol Night Serum,ORGANIC,One Love Organics,One Love Organics,ECOCERT GREENLIFE,3.1
Botanical A Facial Cleanser,ORGANIC,One Love Organics,One Love Organics,ECOCERT GREENLIFE,3.1
Botanical E Neck and Décolleté Firming Cream,ORGANIC,One Love Organics,One Love Organics,ECOCERT GREENLIFE,3.1
Botanical E Youth Preservation Serum,ORGANIC,One Love Organics,One Love Organics,ECOCERT GREENLIFE,3.1
Brighten Up Eye Gel,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Brightening Cream IND-DBC-RB (99.5% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
Brightening Eye Gel,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,4.1
Calming Crème,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Calming Facial Treatment Oil for Sensitive Skin,ORGANIC,"Prima Fleur Botanicals, Inc.",PRIMA FLEUR BOTANICALS INC,ECOCERT GREENLIFE,3.1
Camellia and Lavender Balm -- Bebe,NATURAL,Chantecaille,CHANTECAILLE BEAUTE INC,ECOCERT GREENLIFE,3.1
Clarifying Cleanser 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Clarifying Mask 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Clarifying Moisturizer 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Concentrated Brightening Essence,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Concentrated Brightening Serum,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
COOLA Sunless Tan Anti-Aging Daily Moisturizer,ORGANIC,Coola Suncare,COOLA Suncare,ECOCERT GREENLIFE,3.1
COOLA Sunless Tan Luminizing Body Serum,ORGANIC,Coola Suncare,COOLA Suncare,ECOCERT GREENLIFE,3.1
COSMOS ORGANIC GEL DOUCHE AVEC PARFUM NERRA,ORGANIC,NERRA,Nerra Inc,ECOCERT GREENLIFE,3.1
COSMOS ORGANIC GEL DOUCHE SANS PARFUM NERRA,ORGANIC,NERRA,Nerra Inc,ECOCERT GREENLIFE,3.1
Crambe Abyssinica & Sunflower Massage Oil,ORGANIC,PRIMA FLEUR BOTANICALS INC,PRIMA FLEUR BOTANICALS INC,ECOCERT GREENLIFE,3.1
Creme Riche,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Damascena & White Tea Antioxidant Hydrating Face Masque,ORGANIC,"Prima Fleur Botanicals, Inc.",PRIMA FLEUR BOTANICALS INC,ECOCERT GREENLIFE,3.1
DAY GLOW KIT PALETTE,NATURAL,Organic to Green Inc,Organic to Green Inc,ECOCERT GREENLIFE,3.1
Dry Hair Nourishment & Defrizzer (99% Org),ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
Elixir Vitae Eye Serum 3.0,NATURAL,TATA'S NATURAL ALCHEMY,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Elixir Vitae Serum,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
ENERGIZING DAY SERUM,NATURAL,Ki'olal Biocosmetics,KIOLA,ECOCERT GREENLIFE,4.1
ERA Organics Feminine Balm Ointment,ORGANIC,ERA Organics,ERA ORGANICS,ECOCERT GREENLIFE,3.1
Essential Body Lotion (71% Org),ORGANIC,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
EXFOLIATING POWDER -- MARY KAY NATURALLY,NATURAL,MARY KAY,Mary Kay Inc.,ECOCERT GREENLIFE,3.1
Flower Petal Hair & Body Wash -- Bebe,ORGANIC,Chantecaille,CHANTECAILLE BEAUTE INC,ECOCERT GREENLIFE,3.1
Fortifying Moisturizer,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Fragrance Free Triple Milled Soap,ORGANIC,Wegmans,Commonwealth Soap & Toiletries,ECOCERT GREENLIFE,3.1
Fragrance Free Triple Milled Soap 3-Pack,ORGANIC,Wegmans,Commonwealth Soap & Toiletries,ECOCERT GREENLIFE,3.1
French Diaper Care -- Liniment,ORGANIC,Propre Baby,Propre Baby,ECOCERT GREENLIFE,4.1
Fresh Tonic Lotion,ORGANIC,NIKKEN,NIKKEN,ECOCERT GREENLIFE,3.1
GEL DOUCHE AVEC PARFUM,ORGANIC,NERRA,Nerra Inc,ECOCERT GREENLIFE,4.1
Gentle Daily Peel (23% Org),ORGANIC,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
"Geranium & Ylang Ylang Body Milk (75.74% Org, 99.40% Nat)",ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
Hand and Foot Cream,ORGANIC,NIKKEN,NIKKEN,ECOCERT GREENLIFE,3.1
HUILE SECHE AVEC PARFUM,ORGANIC,NERRA,Nerra Inc,ECOCERT GREENLIFE,4.1
HUILE SECHE AVEC PARFUM NERRA,ORGANIC,NERRA,Nerra Inc,ECOCERT GREENLIFE,3.1
HUILE SECHE SANS PARFUM NERRA,ORGANIC,NERRA,Nerra Inc,ECOCERT GREENLIFE,3.1
Hurraw Apple Lip Balm,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw Banana Lip Balm with Baobob,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw Green Tea Lip Balm - 70% Organic -- CLASSIC,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw Huckleberry Lip Balm,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Almond Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! BALMUNDER® Almond Mint Lemongrass,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! BALMUNDER® Cedarwood Vetiver Lime,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! BALMUNDER® Coconut Pineapple Orange,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! BALMUNDER® Unscented,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Black Cherry Tinted Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Chai Spice Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Cherry & Lemon Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Choco & Mint Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Chocolate Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Coconut Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Coffee Bean Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Earl Grey Lip Balm - 70% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Grapefruit Lip Balm - 70% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Kapha Lip Balm: grapefruit ginger eucalyptus - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Lemon Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Licorice Lip Balm - 72% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Lime & Coconut Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Lime Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Mint Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Moon Lip Balm - 76% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
"Hurraw Watermelon Lip Balm - 100% natural origin, 74.48% organic",NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Orange Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Pineapple Lip Balm with Papaya - 73% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Pitta Lip Balm: coconut mint lemongrass - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! PLANTCOLOR® №1 - 70% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! PLANTCOLOR® №2 - 70% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Raspberry Tinted Lip Balm - 74% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Root Beer Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Sun Lip Balm SPF 15 - 54% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Tinted Hazelnut Lip Balm - 79% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Unscented Lip Balm - 74% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Vanilla & Orange Lip Balm - 70% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Vanilla Bean Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Vata Lip Balm: almond cardamom rose - 72% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! VOLCANIC Hair Mask : Cinnamon Shikakai Marshmallow,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! VOLCANIC Scrub : Cherry Hibiscus Pineapple,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! VOLCANIC Soap : Vetiver Mint Lemon,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! VOLCANIC Tooth Powder : Mint Cinnamon Tea Tree,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Wintermint Lip Balm - 81% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hyaluronic Gel Moisturizer,ORGANIC,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Hydrating Floral Essence,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Hydrating Floral Mask,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
I-recover Mind and Body Gel (99% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
I-waken Eye Serum (99% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
I-waken Resurfacing Mask (99% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
Illuminating Eye Creme 3.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Immortelle Facial Mist,ORGANIC,"Prima Fleur Botanicals, Inc.",PRIMA FLEUR BOTANICALS INC,ECOCERT GREENLIFE,3.1
Intellimune Oil - Skin (subformula 1001.15),ORGANIC,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
Isha Life Bloom Saffron & Sandalwood Shower Gel -- Body Care,ORGANIC,Isha Life Bloom,Isha Foundation,ECOCERT GREENLIFE,3.1
Isha Life Bloom Hibiscus & Grapeseed Hair Conditioner -- Hair Care,ORGANIC,Isha Life Bloom,Isha Foundation,ECOCERT GREENLIFE,3.1
Kakadu Plum Vitamin C Eye Cream -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Kakadu Plum Vitamin C Serum -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Lavender Triple Milled Soap 3-Pack,ORGANIC,Wegmans,Commonwealth Soap & Toiletries,ECOCERT GREENLIFE,3.1
Leave in Conditioning Mist with Green Tea & Calendula (20.71% Org),ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
Lip Balm -- Lip Balm - Almond Cardamom Rose,ORGANIC,Ilika,ILIKA,ECOCERT GREENLIFE,3.1
Lip Balm -- Lip Balm - Eucalyptus Mint,ORGANIC,Ilika,ILIKA,ECOCERT GREENLIFE,3.1
Lip Balm -- Lip Balm - Ginger Lemon,ORGANIC,Ilika,ILIKA,ECOCERT GREENLIFE,3.1
Lip Balm -- Lip Balm - Lavender Chamomile,ORGANIC,Ilika,ILIKA,ECOCERT GREENLIFE,3.1
Lip Balm -- Lip Balm - Orange Tangerine,ORGANIC,Ilika,ILIKA,ECOCERT GREENLIFE,3.1
Lip Balm -- Lip Balm - Peppermint,ORGANIC,Ilika,ILIKA,ECOCERT GREENLIFE,3.1
Lip Balm -- Lip Balm - Strawberry,ORGANIC,Ilika,ILIKA,ECOCERT GREENLIFE,3.1
Lip Balm -- Lip Balm - Unscented,ORGANIC,Ilika,ILIKA,ECOCERT GREENLIFE,3.1
Lip Balm -- Lip Balm - Vanilla Beans,ORGANIC,Ilika,ILIKA,ECOCERT GREENLIFE,3.1
Lip Balm Original (100% Org),ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
Lip Balm Peppermint (100% Org),ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
Lip Balm Raspberry (100% Org),ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
Lip Balm Vanilla (100% Org),ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
"Liquid Green Body Oil (3.97% Org, 100% Nat)",NATURAL,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
"Liquid Green Revival Eye Whip (1.02% Org, 100% Nat)",NATURAL,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
Love + Aloe Cleansing Oil,ORGANIC,One Love Organics,One Love Organics,ECOCERT GREENLIFE,3.1
Love + Eyebright Eye Serum,ORGANIC,One Love Organics,One Love Organics,ECOCERT GREENLIFE,3.1
Love + Rose Hydrating Priming Serum,ORGANIC,One Love Organics,One Love Organics,ECOCERT GREENLIFE,3.1
Love + Wild Berry Foaming Cleanser,ORGANIC,One Love Organics,One Love Organics,ECOCERT GREENLIFE,3.1
MAYAN MIRACLE MIST,ORGANIC,Ki'olal Biocosmetics,KIOLA,ECOCERT GREENLIFE,4.1
Milky Mushroom Gentle Cleansing Oil,ORGANIC,KORA US LLC,KORA US LLC,ECOCERT GREENLIFE,4.1
Milky Mushroom Ultra-Hydrating Mask -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Minty Mineral Hydration Mist,ORGANIC,KORA US LLC,KORA US LLC,ECOCERT GREENLIFE,4.1
Moisturizing Face Cream,ORGANIC,NIKKEN,NIKKEN,ECOCERT GREENLIFE,3.1
MOISTURIZING STICK,NATURAL,MARY KAY,Mary Kay Inc.,ECOCERT GREENLIFE,3.1
MOUSSE PRE EXFOLIANTE CORPS NERRA (=savon de marseille liquide),ORGANIC,NERRA,Nerra Inc,ECOCERT GREENLIFE,3.1
NATURAL SKIN CARE -- NOLEO,ORGANIC,NOLEO,"NOLEO CARE COMPANY, LLC",ECOCERT GREENLIFE,4.1
NIGHT GLOW KIT PALETTE,NATURAL,Organic to Green Inc,Organic to Green Inc,ECOCERT GREENLIFE,3.1
NOLEO 3-IN-1 DIAPER CARE,ORGANIC,"NOLEO CARE COMPANY, LLC","NOLEO CARE COMPANY, LLC",ECOCERT GREENLIFE,3.1
Noni Bright Vitamin C Serum -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Noni Glow Body Oil,ORGANIC,KORA Organics by Miranda Kerr for KORA Australia,KORA US LLC,ECOCERT GREENLIFE,3.1
Noni Glow Body Oil -- KORA Organics,ORGANIC,KORA Organics by Miranda Kerr,KORA US LLC,ECOCERT GREENLIFE,3.1
Noni Glow Face Balm -- KORA Organics,ORGANIC,KORA US LLC,KORA US LLC,ECOCERT GREENLIFE,3.1
Noni Glow Face Oil -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Noni Glow Sleeping Mask,ORGANIC,KORA,KORA US LLC,ECOCERT GREENLIFE,3.1
Noni Glow Sleeping Mask -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Noni Night AHA Resurfacing Serum -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,3.1
Noni Radiant Eye Oil -- KORA Organics,ORGANIC,KORA Organics by Miranda Kerr for KORA Australia,KORA US LLC,ECOCERT GREENLIFE,3.1
Noni Radiant Eye Oil -- KORA Organics,ORGANIC,KORA Organics by Miranda Kerr,KORA US LLC,ECOCERT GREENLIFE,4.1
Nourish & Glow Trio -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,3.1
NOURISHING CLEANSER,ORGANIC,Ki'olal Biocosmetics,KIOLA,ECOCERT GREENLIFE,3.1
Nourishing Hand & Body Lotion,ORGANIC,KORA US,"Colorado Quality Products, LLC., dba Elevation Labs Colorado",ECOCERT GREENLIFE,3.1
Nourishing Hand & Body Lotion -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
NOURISHING OIL -- MARY KAY NATURALLY,NATURAL,MARY KAY,Mary Kay Inc.,ECOCERT GREENLIFE,3.1
Oasis Hydrating Tonic,ORGANIC,ODE,"McEvoy of Marin, LLC",ECOCERT GREENLIFE,3.1
Oil Cleanser,ORGANIC,Giving Beauty LLC,GIVING BEAUTY LLC,ECOCERT GREENLIFE,3.1
"Oil-Free Moisturiser (71.09% Org, 99.45% Nat)",ORGANIC,Juice Beauty,Juice Beauty,SOIL ASSOCIATION CERTIFICATION,3.1
Olive & Citrus Daily Moisturizer,NATURAL,ODE,"McEvoy of Marin, LLC",ECOCERT GREENLIFE,3.1
Olive Creambalm Intensive Moisturizer,NATURAL,ODE,"McEvoy of Marin, LLC",ECOCERT GREENLIFE,3.1
Olkerii Marula Oil Cleanser,NATURAL,PRIMA FLEUR BOTANICALS INC,PRIMA FLEUR BOTANICALS INC,ECOCERT GREENLIFE,3.1
"OneBody Hand Balm (81% Org, 99% Nat)",ORGANIC,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
"OneBody Hand Sanitizer (71% Org, 100% Nat)",ORGANIC,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
Orange Blossom Face Cream -- Bebe,ORGANIC,Chantecaille,CHANTECAILLE BEAUTE INC,ECOCERT GREENLIFE,3.1
Outdoor Buzz Spray (23% Org),ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
"Outdoor Spray (58.88% Org, 100% Nat)",ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
Overnight Banish Gel (100% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
Phyto-Pigments Illuminating Primer,ORGANIC,Juice Beauty,Columbia Cosmetics Manufacturing Inc,ECOCERT GREENLIFE,3.1
"Phyto-Pigments Illuminating Primer (78.38% Org, 99.94% Nat)",ORGANIC,Juice Beauty,Juice Beauty,SOIL ASSOCIATION CERTIFICATION,3.1
"Phyto-Pigments Perfecting Concealer (70.07% Org, 100% Nat)",ORGANIC,Juice Beauty,Juice Beauty,SOIL ASSOCIATION CERTIFICATION,3.1
Plant Stem Cell Retinol Alternative Moisturizer -- KORA ORGANICS,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Plant Stem Cell Retinol Alternative Serum -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Pré-Exfoliating Foam / Mousse pré-exfoliante Sans Parfum,ORGANIC,NERRA,Nerra Inc,ECOCERT GREENLIFE,4.1
PURIFYING CLEANSER -- MARY KAY NATURALLY,NATURAL,MARY KAY,Mary Kay Inc.,ECOCERT GREENLIFE,3.1
Purifying Cleanser 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Purifying Face Wash (98% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
Purifying Facial Treatment,ORGANIC,"Prima Fleur Botanicals, Inc.",PRIMA FLEUR BOTANICALS INC,ECOCERT GREENLIFE,3.1
Purifying Hand Wash (77% Org),ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
Purifying Mask,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Radiance Face Scrub,ORGANIC,NIKKEN,NIKKEN,ECOCERT GREENLIFE,3.1
Radiance Mask,ORGANIC,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Radiance Renewal Peel (99% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
RECOVERY NIGHT TREATMENT,NATURAL,Ki'olal Biocosmetics,KIOLA,ECOCERT GREENLIFE,4.1
Redefining Body Balm,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Refining Cleanser,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Refreshing Cleanser,ORGANIC,TATA'S NATURAL ALCHEMY,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Regenerating Cleanser 3.0,ORGANIC,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
"ReGenerative Eye Gel (78.26% Org, 99.56% Nat)",ORGANIC,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
"ReGenerative Super Power C Skin Serum (80.22% Org, 99.6% Nat)",ORGANIC,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
Rejuvenating 2 in 1 Facial Mask and Exfoliator -- REJUVENATING ANTI-WRINKLES-PEONY,ORGANIC,Andrew International LLC,Andrew International LLC,ECOCERT GREENLIFE,3.1
Rejuvenating Facial Cream -- REJUVENATING ANTI-WRINKLES-PEONY,ORGANIC,Andrew International LLC,Andrew International LLC,ECOCERT GREENLIFE,3.1
Rejuvenating Serum 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Rejuvenating Serum 3.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Renewing Hand & Body Wash,ORGANIC,KORA US,"Colorado Quality Products, LLC., dba Elevation Labs Colorado",ECOCERT GREENLIFE,3.1
Repairative Moisturizer 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Restorative Eye Cream (99.6% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
Restorative Eye Crème 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Restorative Eye Crème 3.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Resurfacing Body Serum 2.0,NATURAL,TATA'S NATURAL ALCHEMY,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Resurfacing Mask 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Resurfacing Serum,NATURAL,TATA'S NATURAL ALCHEMY,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Resurfacing Serum 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Retinoic Nutrient Face Oil 2.0,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Retinol Alternative Cream (99.6% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
Revitalizing Face Serum,ORGANIC,NIKKEN,NIKKEN,ECOCERT GREENLIFE,3.1
Revitalizing Radiance 2 in 1 Facial Mask and Exfoliator -- REVITALIZING RADIANCE-ROSE,ORGANIC,Andrew International LLC,Andrew International LLC,ECOCERT GREENLIFE,3.1
Revitalizing Radiance Facial Cream -- REVITALIZING RADIANCE ROSE,ORGANIC,Andrew International LLC,Andrew International LLC,ECOCERT GREENLIFE,3.1
"Rose & Palmarosa Hand Cream (75,28% Org, 99,37% Nat)",ORGANIC,Erbaviva,Erbaviva,SOIL ASSOCIATION CERTIFICATION,3.1
Rose Quartz Glow Luminizer -- KORA Organics,ORGANIC,KORA Organics by Miranda Kerr,KORA US LLC,ECOCERT GREENLIFE,3.1
Rose Quartz Glow Luminizer -- KORA Organics,ORGANIC,KORA Organics by Miranda Kerr for KORA Australia,KORA US LLC,ECOCERT GREENLIFE,3.1
Sandalwood Triple Milled Soap,ORGANIC,Wegmans,Commonwealth Soap & Toiletries,ECOCERT GREENLIFE,3.1
"Seed Synergy Hydra-Lotion (28% Org, 99% Nat)",ORGANIC,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
Seed Synergy Micellar Water (99% Nat),NATURAL,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
Serum Foundation Natural Tan,ORGANIC,Juice Beauty,Columbia Cosmetics Manufacturing Inc,ECOCERT GREENLIFE,3.1
Silky Sun Drops -- KORA ORGANICS,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Smoothing Body Scrub,ORGANIC,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Softening Cleanser,ORGANIC,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
"Soothe Sayer Bi-phase Scalp Treatment (67.76 % Org, 99.56% Nat)",ORGANIC,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
Soothing 2 in 1 Facial Mask and Exfoliator -- SENSITIVE SKIN-LAVENDER,ORGANIC,Andrew International LLC,Andrew International LLC,ECOCERT GREENLIFE,3.1
Soothing Facial Cream -- SENSITIVE SKIN -LAVENDER,ORGANIC,Andrew International LLC,Andrew International LLC,ECOCERT GREENLIFE,3.1
Sparkling Citrus Triple Milled Soap,ORGANIC,Wegmans,Commonwealth Soap & Toiletries,ECOCERT GREENLIFE,3.1
Squalane Facial Oil (100% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
Sunless Tan Anti-Aging Face Serum,ORGANIC,Coola Suncare,COOLA Suncare,ECOCERT GREENLIFE,3.1
Sunless Tan Dry Oil Mist,ORGANIC,Coola Suncare,COOLA Suncare,ECOCERT GREENLIFE,3.1
Sunless Tan Express Sculpting Mousse,ORGANIC,Coola Suncare,COOLA Suncare,ECOCERT GREENLIFE,3.1
Sunless Tan Multi-Active Firming Lotion,ORGANIC,Coola Suncare,COOLA Suncare,ECOCERT GREENLIFE,3.1
Superfruit Facial Cream (99% Nat),NATURAL,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
Sweet Lupine Eye Contour Gel,ORGANIC,"Prima Fleur Botanicals, Inc.",PRIMA FLEUR BOTANICALS INC,ECOCERT GREENLIFE,3.1
The Body Wash Fragrance Free / Le Gel Douche Corps Sans Parfum,ORGANIC,NERRA,Nerra Inc,ECOCERT GREENLIFE,4.1
Turmeric Brightening & Exfoliating Mask -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Turmeric Brightening & Exfoliating Scrub + Mask -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Turmeric Brightening Trio -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,3.1
Turmeric Glow Drops -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Turmeric Glow Foaming Cleanser,ORGANIC,KORA US,"Colorado Quality Products, LLC., dba Elevation Labs Colorado",ECOCERT GREENLIFE,3.1
Turmeric Glow Foaming Cleanser -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Turmeric Glow Moisturizer -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Turmeric Sustainability Set,ORGANIC,KORA US LLC,KORA US LLC,ECOCERT GREENLIFE,3.1
Turmeric Sustainbility Set,ORGANIC,KORA ORGANICS BY MIRANDA KERR PTY LTD,KORA US LLC,ECOCERT GREENLIFE,3.1
Ultra Clarifying Masque -- Gaelle Organic,ORGANIC,Gaelle Organic,Gaelle Organic,ECOCERT GREENLIFE,3.1
Ultra Clarifying Serum -- Gaelle Organic,ORGANIC,Gaelle Organic,Gaelle Organic,ECOCERT GREENLIFE,3.1
Velvet Cleansing Cream,ORGANIC,NIKKEN,NIKKEN,ECOCERT GREENLIFE,3.1
"Vitalisea Pore Polish (71% Org, 99% Nat)",ORGANIC,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
"Vitalisea Time Traveler Serum (85% Org, 99% Nat)",ORGANIC,Intelligent Nutrients,Intelligent Nutrients,SOIL ASSOCIATION CERTIFICATION,3.1
Water-Lock Moisturizer Refill,ORGANIC,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Whipped Body Butter (72% Org),ORGANIC,AX Beauty Brands Global LLC dba Indie Lee,AX Beauty Brands Global LLC dba Indie Lee,SOIL ASSOCIATION CERTIFICATION,3.1
Wild Moss Rose Body Lotion -- Bebe,ORGANIC,Chantecaille,CHANTECAILLE BEAUTE INC,ECOCERT GREENLIFE,3.1
Youth Activ Face Serum,ORGANIC,NIKKEN,NIKKEN,ECOCERT GREENLIFE,3.1`

// Parse CSV data
function parseCSV(csvText) {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(",")
  const data = []

  for (let i = 1; i < lines.length; i++) {
    const values = []
    let current = ""
    let inQuotes = false

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j]

      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === "," && !inQuotes) {
        values.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    values.push(current.trim())

    if (values.length === headers.length) {
      const row = {}
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]
      })
      data.push(row)
    }
  }

  return data
}

// Categorize products based on their names
function categorizeProduct(productName) {
  const name = productName.toLowerCase()

  if (name.includes("lip balm") || name.includes("lip ")) {
    return "Lip Care"
  } else if (name.includes("eye") || name.includes("contour")) {
    return "Eye Care"
  } else if (name.includes("cleanser") || name.includes("cleansing") || name.includes("wash")) {
    return "Cleansers"
  } else if (
    name.includes("moisturizer") ||
    name.includes("moisturiser") ||
    name.includes("cream") ||
    name.includes("lotion")
  ) {
    return "Moisturizers"
  } else if (name.includes("serum") || name.includes("essence")) {
    return "Serums & Treatments"
  } else if (name.includes("mask") || name.includes("masque")) {
    return "Face Masks"
  } else if (name.includes("oil") && (name.includes("face") || name.includes("facial"))) {
    return "Face Oils"
  } else if (name.includes("body") || name.includes("hand")) {
    return "Body Care"
  } else if (
    name.includes("hair") ||
    name.includes("scalp") ||
    name.includes("shampoo") ||
    name.includes("conditioner")
  ) {
    return "Hair Care"
  } else if (name.includes("baby") || name.includes("bebe") || name.includes("diaper")) {
    return "Baby Care"
  } else if (
    name.includes("foundation") ||
    name.includes("concealer") ||
    name.includes("primer") ||
    name.includes("palette")
  ) {
    return "Makeup"
  } else if (name.includes("soap")) {
    return "Soaps"
  } else if (name.includes("sun") || name.includes("spf")) {
    return "Sun Care"
  } else {
    return "Skincare"
  }
}

// Generate price based on product type and brand
function generatePrice(productName, brand) {
  const name = productName.toLowerCase()
  const brandName = brand.toLowerCase()

  // Premium brands get higher prices
  const premiumBrands = ["kora organics", "tata harper", "chantecaille", "juice beauty"]
  const isPremium = premiumBrands.some((pb) => brandName.includes(pb))

  let basePrice = 15

  if (name.includes("serum") || name.includes("treatment")) {
    basePrice = isPremium ? 85 : 45
  } else if (name.includes("moisturizer") || name.includes("cream")) {
    basePrice = isPremium ? 75 : 35
  } else if (name.includes("cleanser") || name.includes("wash")) {
    basePrice = isPremium ? 45 : 25
  } else if (name.includes("oil")) {
    basePrice = isPremium ? 65 : 40
  } else if (name.includes("mask")) {
    basePrice = isPremium ? 55 : 30
  } else if (name.includes("lip balm")) {
    basePrice = isPremium ? 25 : 12
  } else if (name.includes("body") || name.includes("hand")) {
    basePrice = isPremium ? 40 : 20
  } else if (name.includes("set") || name.includes("kit") || name.includes("trio")) {
    basePrice = isPremium ? 120 : 65
  }

  // Add some variation
  const variation = Math.random() * 0.3 - 0.15 // ±15%
  return Math.round(basePrice * (1 + variation))
}

async function importCosmosProducts() {
  try {
    console.log("[v0] Starting COSMOS products import...")

    // Parse the CSV data
    const products = parseCSV(cosmosProductsData)
    console.log(`[v0] Parsed ${products.length} products from CSV`)

    // Create categories
    const categories = [
      "Lip Care",
      "Eye Care",
      "Cleansers",
      "Moisturizers",
      "Serums & Treatments",
      "Face Masks",
      "Face Oils",
      "Body Care",
      "Hair Care",
      "Baby Care",
      "Makeup",
      "Soaps",
      "Sun Care",
      "Skincare",
    ]

    console.log("[v0] Creating product categories...")
    const categoryMap = {}

    for (const categoryName of categories) {
      const { data: existingCategory } = await supabase
        .from("categories")
        .select("id")
        .eq("name", categoryName)
        .single()

      if (existingCategory) {
        categoryMap[categoryName] = existingCategory.id
      } else {
        const { data: newCategory, error } = await supabase
          .from("categories")
          .insert({
            name: categoryName,
            slug: categoryName.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"),
            description: `COSMOS certified ${categoryName.toLowerCase()} products`,
          })
          .select("id")
          .single()

        if (error) {
          console.error(`[v0] Error creating category ${categoryName}:`, error)
        } else {
          categoryMap[categoryName] = newCategory.id
        }
      }
    }

    // Create COSMOS certifications
    console.log("[v0] Setting up COSMOS certifications...")
    const certificationBodies = ["ECOCERT GREENLIFE", "SOIL ASSOCIATION CERTIFICATION"]
    const certificationMap = {}

    for (const body of certificationBodies) {
      const { data: existingCert } = await supabase
        .from("certifications")
        .select("id")
        .eq("name", `COSMOS - ${body}`)
        .single()

      if (existingCert) {
        certificationMap[body] = existingCert.id
      } else {
        const { data: newCert, error } = await supabase
          .from("certifications")
          .insert({
            name: `COSMOS - ${body}`,
            category: "Organic/Natural",
            description: `COSMOS certification by ${body} - ensuring organic and natural cosmetic standards`,
            website_url: body.includes("ECOCERT") ? "https://www.ecocert.com" : "https://www.soilassociation.org",
          })
          .select("id")
          .single()

        if (error) {
          console.error(`[v0] Error creating certification ${body}:`, error)
        } else {
          certificationMap[body] = newCert.id
        }
      }
    }

    // Create a default vendor for COSMOS products
    console.log("[v0] Creating COSMOS vendor...")
    const { data: cosmosVendor, error: vendorError } = await supabase
      .from("vendors")
      .upsert(
        {
          business_name: "COSMOS Certified Products",
          business_description:
            "Curated collection of COSMOS certified organic and natural cosmetic products from leading brands worldwide.",
          business_email: "info@cosmoscertified.com",
          is_verified: true,
          commission_rate: 0.15,
        },
        {
          onConflict: "business_name",
        },
      )
      .select("id")
      .single()

    if (vendorError) {
      console.error("[v0] Error creating vendor:", vendorError)
      return
    }

    const vendorId = cosmosVendor.id

    // Insert products in batches
    console.log("[v0] Inserting products...")
    const batchSize = 50
    let insertedCount = 0

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize)
      const productInserts = []

      for (const product of batch) {
        const category = categorizeProduct(product["Commercial name"])
        const categoryId = categoryMap[category]
        const price = generatePrice(product["Commercial name"], product["Brand name"])

        // Generate SKU from product name
        const sku = product["Commercial name"]
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .toUpperCase()
          .substring(0, 50)

        productInserts.push({
          name: product["Commercial name"],
          brand: product["Brand name"],
          description: `${product["COSMOS Signature"]} certified ${category.toLowerCase()} by ${product["Brand name"]}. Certified by ${product["Certified by"]} under COSMOS version ${product["Version"]}.`,
          price: price,
          compare_at_price: Math.round(price * 1.2), // 20% higher compare price
          sku: sku,
          vendor_id: vendorId,
          category_id: categoryId,
          is_active: true,
          inventory_quantity: Math.floor(Math.random() * 100) + 10, // Random inventory 10-109
          notes: `Company: ${product["Company name"]} | COSMOS: ${product["COSMOS Signature"]} | Version: ${product["Version"]}`,
        })
      }

      const { data: insertedProducts, error: insertError } = await supabase
        .from("products")
        .insert(productInserts)
        .select("id, name")

      if (insertError) {
        console.error("[v0] Error inserting products batch:", insertError)
        continue
      }

      insertedCount += insertedProducts.length
      console.log(`[v0] Inserted batch ${Math.floor(i / batchSize) + 1}: ${insertedProducts.length} products`)

      // Link products to certifications
      const certificationLinks = []
      for (let j = 0; j < insertedProducts.length; j++) {
        const product = batch[j]
        const insertedProduct = insertedProducts[j]
        const certificationId = certificationMap[product["Certified by"]]

        if (certificationId) {
          certificationLinks.push({
            entity_id: insertedProduct.id,
            entity_type: "product",
            certification_id: certificationId,
            verified: true,
            certification_data: {
              cosmos_signature: product["COSMOS Signature"],
              version: product["Version"],
              company: product["Company name"],
              certified_by: product["Certified by"],
            },
          })
        }
      }

      if (certificationLinks.length > 0) {
        const { error: certError } = await supabase.from("entity_certifications").insert(certificationLinks)

        if (certError) {
          console.error("[v0] Error linking certifications:", certError)
        }
      }
    }

    console.log(`[v0] Successfully imported ${insertedCount} COSMOS certified products!`)
    console.log("[v0] Import completed successfully!")
  } catch (error) {
    console.error("[v0] Import failed:", error)
  }
}

// Run the import
importCosmosProducts()
