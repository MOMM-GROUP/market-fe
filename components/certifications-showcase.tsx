"use client"

import { useState } from "react"

export default function CertificationsShowcase() {
  const [selectedCertificationTab, setSelectedCertificationTab] = useState("organic")

  return (
    <section className="py-20" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl font-bold" style={{ color: "#0F172A" }}>
            Verifying Ethical Commerce
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "#475569" }}>
            From organic materials to fair labor practices, we organize certifications by what matters most to you
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 bg-gray-50 p-2 rounded-2xl max-w-6xl mx-auto">
          {[
            { id: "organic", emoji: "🌱", title: "Organic", color: "#059669" },
            { id: "labor", emoji: "🤝", title: "Fair Labor", color: "#0D9488" },
            { id: "circular", emoji: "♻️", title: "Circular", color: "#7C3AED" },
            { id: "climate", emoji: "🌍", title: "Climate", color: "#F97316" },
            { id: "health", emoji: "🧪", title: "Health", color: "#DC2626" },
            { id: "business", emoji: "🏢", title: "Business", color: "#1E40AF" },
            { id: "quality", emoji: "⭐", title: "Quality", color: "#8B5CF6" },
            { id: "diversity", emoji: "🌈", title: "Diversity", color: "#EC4899" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCertificationTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 m-1 ${
                selectedCertificationTab === tab.id
                  ? "text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-white hover:shadow-md"
              }`}
              style={{
                backgroundColor: selectedCertificationTab === tab.id ? tab.color : "transparent",
              }}
            >
              <span>{tab.emoji}</span>
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Certification Content */}
        <div className="space-y-8">
          {selectedCertificationTab === "organic" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>
                  Organic & Natural Certifications
                </h3>
                <p className="text-lg" style={{ color: "#475569" }}>
                  Certifications that verify products are made with organic materials and natural processes
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  {
                    name: "Global Organic Textile Standard (GOTS)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285568/GlobalOrganicTextileStandard.jpg",
                    website: "https://www.global-standard.org/",
                  },
                  {
                    name: "USDA Organic",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285556/USDAOrganic.jpg",
                    website: "https://www.usda.gov/topics/organic",
                  },
                  {
                    name: "EU Organic",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285553/EUOrganic.jpg",
                    website: "https://ec.europa.eu/info/food-farming-fisheries/farming/organic-farming/organic-logo_en",
                  },
                  {
                    name: "USDA Certified 100% Organic",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285556/USDAOrganic.jpg",
                    website: "https://www.usda.gov/topics/organic",
                  },
                  {
                    name: "USDA NOP Organic",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285556/USDAOrganic.jpg",
                    website: "https://www.usda.gov/topics/organic",
                  },
                  {
                    name: "Organic Content Standard (OCS)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285554/OrganicContentStandard100.jpg",
                    website: "https://textileexchange.org/standards/organic-content-standard/",
                  },
                  {
                    name: "Organic Content Standard 100",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285554/OrganicContentStandard100.jpg",
                    website: "https://textileexchange.org/standards/organic-content-standard/",
                  },
                  {
                    name: "Regenerative Organic Certified (ROC)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285570/RegenerativeOrganicCertifiedlogo.jpg",
                    website: "https://www.regenorganic.org/",
                  },
                  {
                    name: "Natrue",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285569/Natrue.jpg",
                    website: "https://www.natrue.org/",
                  },
                  {
                    name: "Soil Association",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285555/SoilAssociation.jpg",
                    website: "https://www.soilassociation.org/certification/",
                  },
                  {
                    name: "Ecocert",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285566/ECOLOGO.jpg",
                    website: "https://www.ecocert.com/",
                  },
                  {
                    name: "Non GMO Project Verified",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285566/ECOLOGO.jpg",
                    website: "https://www.nongmoproject.org/",
                  },
                ].map((cert, index) => (
                  <a
                    key={index}
                    href={cert.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:scale-105 group"
                    style={{ borderColor: "#F0FDFA" }}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <img
                        src={cert.logo || "/placeholder.svg"}
                        alt={cert.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p
                      className="text-xs font-medium text-center group-hover:text-teal-600 transition-colors"
                      style={{ color: "#0F172A" }}
                    >
                      {cert.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {selectedCertificationTab === "labor" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>
                  Fair Labor & Social Certifications
                </h3>
                <p className="text-lg" style={{ color: "#475569" }}>
                  Certifications that ensure fair wages, safe working conditions, and ethical labor practices
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  {
                    name: "Fair Trade Certified",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/e_background_removal/c_crop,ar_1:1,f_png,e_sharpen/v1707285558/FairTradeCertified.jpg",
                    website: "https://www.fairtradecertified.org/",
                  },
                  {
                    name: "Fairtrade International",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/e_background_removal/c_crop,ar_1:1,f_png,e_sharpen/v1707285560/FairtradeInternational.jpg",
                    website: "https://www.fairtradeamerica.org/why-fairtrade/",
                  },
                  {
                    name: "Fair Trade USA",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285558/FairTradeCertified.jpg",
                    website: "https://www.fairtradecertified.org/",
                  },
                  {
                    name: "Fair for Life",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/e_background_removal/c_crop,ar_1:1,f_png,e_sharpen/v1707285559/FairforLife.jpg",
                    website: "https://www.fairforlife.org/",
                  },
                  {
                    name: "Fair Rubber",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/e_background_removal/c_crop,ar_1:1,f_png,e_sharpen/v1707285560/FairRubber.jpg",
                    website: "https://fairrubber.org/",
                  },
                  {
                    name: "Fair Labor Association (FLA)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285558/FairTradeCertified.jpg",
                    website: "https://www.fairlabor.org/",
                  },
                  {
                    name: "SA8000 (Social Accountability)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285558/FairTradeCertified.jpg",
                    website: "https://sa-intl.org/",
                  },
                  {
                    name: "Responsible Wool Standard",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707284629/ResponsibleWoolStandard.jpg",
                    website: "https://textileexchange.org/standards/responsible-wool/",
                  },
                  {
                    name: "US Cotton Trust Protocol",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285571/USCottonTrustProtocol.png",
                    website: "https://trustuscotton.org/",
                  },
                  {
                    name: "Better Cotton Initiative (BCI)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285571/USCottonTrustProtocol.png",
                    website: "https://bettercotton.org/",
                  },
                  {
                    name: "Ethical Trading Initiative (ETI)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285558/FairTradeCertified.jpg",
                    website: "https://www.ethicaltrade.org/",
                  },
                  {
                    name: "Fair Wear Foundation (FWF)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285558/FairTradeCertified.jpg",
                    website: "https://www.fairwear.org/",
                  },
                ].map((cert, index) => (
                  <a
                    key={index}
                    href={cert.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:scale-105 group"
                    style={{ borderColor: "#F0FDFA" }}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <img
                        src={cert.logo || "/placeholder.svg"}
                        alt={cert.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p
                      className="text-xs font-medium text-center group-hover:text-teal-600 transition-colors"
                      style={{ color: "#0F172A" }}
                    >
                      {cert.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {selectedCertificationTab === "circular" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>
                  Circular Economy & Recycling
                </h3>
                <p className="text-lg" style={{ color: "#475569" }}>
                  Certifications that promote recycling, reuse, and circular economy principles
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  {
                    name: "Global Recycled Standard",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285564/GlobalRecycledStandard.jpg",
                    website: "https://textileexchange.org/standards/recycled-claim-standard-global-recycled-standard/",
                  },
                  {
                    name: "Recycled Claim Standard",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285562/RecycledClaimStandard.jpg",
                    website: "https://textileexchange.org/standards/recycled-claim-standard-global-recycled-standard/",
                  },
                  {
                    name: "Recycled Claim Standard 100",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285562/RecycledClaimStandard100.jpg",
                    website: "https://textileexchange.org/standards/recycled-claim-standard-global-recycled-standard/",
                  },
                  {
                    name: "Cradle to Cradle Certified",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285548/CradletoCradleCertified.jpg",
                    website: "https://www.c2ccertified.org/",
                  },
                  {
                    name: "GreenCircle Certified for Recycled Content",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285561/GreenCircleRecycledContent.jpg",
                    website: "https://www.greencirclecertified.com/recycled-content-amazon-cpf",
                  },
                  {
                    name: "Pre-owned Certified",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285564/Pre-ownedCertifiedlogo.png",
                    website: "https://www.amazon.com/s/browse/?node=23911980011",
                  },
                  {
                    name: "Preowned Certified Fashion",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285565/PreownedCertifiedFashionLogo.png",
                    website: "https://www.amazon.com/b?node=109618761011",
                  },
                  {
                    name: "Responsible Down Standard",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285564/GlobalRecycledStandard.jpg",
                    website: "https://textileexchange.org/standards/responsible-down/",
                  },
                  {
                    name: "Plastic Bank Partner",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285564/Pre-ownedCertifiedlogo.png",
                    website: "https://plasticbank.com/",
                  },
                  {
                    name: "rePurpose Global Partner",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285564/Pre-ownedCertifiedlogo.png",
                    website: "https://repurpose.global/",
                  },
                ].map((cert, index) => (
                  <a
                    key={index}
                    href={cert.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:scale-105 group"
                    style={{ borderColor: "#F3E8FF" }}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <img
                        src={cert.logo || "/placeholder.svg"}
                        alt={cert.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p
                      className="text-xs font-medium text-center group-hover:text-purple-600 transition-colors"
                      style={{ color: "#0F172A" }}
                    >
                      {cert.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {selectedCertificationTab === "climate" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>
                  Climate & Environmental Impact
                </h3>
                <p className="text-lg" style={{ color: "#475569" }}>
                  Certifications focused on carbon neutrality, energy efficiency, and environmental protection
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  {
                    name: "Carbon Neutral by Carbon Trust",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707284639/CarbonNeutralByCarbonTrust.jpg",
                    website: "https://www.carbontrust.com/",
                  },
                  {
                    name: "Carbonfree Certified",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285546/CarbonfreeCertified.jpg",
                    website: "https://carbonfund.org/",
                  },
                  {
                    name: "CarbonNeutral product by Climate Impact Partners",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285547/CarbonNeutralproductbyClimateImpactPartners.jpg",
                    website: "https://www.carbonneutral.com/",
                  },
                  {
                    name: "Climate neutral by ClimatePartner",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285544/ClimateNeutralbyClimatePartner.jpg",
                    website: "https://www.climatepartner.com/en",
                  },
                  {
                    name: "Climate Neutral",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285544/ClimateNeutralbyClimatePartner.jpg",
                    website: "https://www.climateneutral.org/",
                  },
                  {
                    name: "Climate Beneficial",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285544/ClimateNeutralbyClimatePartner.jpg",
                    website: "https://www.climatebeneficial.org/",
                  },
                  {
                    name: "ENERGY STAR Most Efficient",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285557/ENERGYSTARMostEfficient.jpg",
                    website: "https://www.energystar.gov/products/most_efficient",
                  },
                  {
                    name: "ENERGY STAR Canada",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285557/ENERGYSTARMostEfficient.jpg",
                    website: "https://www.energystar.gov/",
                  },
                  {
                    name: "ENERGY STAR U.S.",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285557/ENERGYSTARMostEfficient.jpg",
                    website: "https://www.energystar.gov/",
                  },
                  {
                    name: "1% For the Planet",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285544/ClimateNeutralbyClimatePartner.jpg",
                    website: "https://www.onepercentfortheplanet.org/",
                  },
                  {
                    name: "Forest Stewardship Council (FSC)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285567/TheForestStewardshipCouncil.jpg",
                    website: "https://fsc.org/en/page/about-us",
                  },
                  {
                    name: "Rainforest Alliance Certified",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285560/RainforestAlliancelogo.jpg",
                    website: "https://www.rainforest-alliance.org/faqs/what-does-rainforest-alliance-certified-mean",
                  },
                  {
                    name: "WaterSense",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285572/WaterSenseLogo.jpg",
                    website: "https://www.epa.gov/watersense",
                  },
                ].map((cert, index) => (
                  <a
                    key={index}
                    href={cert.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:scale-105 group"
                    style={{ borderColor: "#FFF7ED" }}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <img
                        src={cert.logo || "/placeholder.svg"}
                        alt={cert.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p
                      className="text-xs font-medium text-center group-hover:text-orange-600 transition-colors"
                      style={{ color: "#0F172A" }}
                    >
                      {cert.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {selectedCertificationTab === "health" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>
                  Health & Toxin-Free Certifications
                </h3>
                <p className="text-lg" style={{ color: "#475569" }}>
                  Certifications that ensure products are free from harmful chemicals and safe for human health
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  {
                    name: "OEKO-TEX STANDARD 100",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285550/OEKOTEXSTANDARD100.jpg",
                    website: "https://www.oeko-tex.com/en/our-standards/standard-100-by-oeko-tex",
                  },
                  {
                    name: "OEKO-TEX MADE IN GREEN",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/OEKOTEXMADEINGREEN.jpg",
                    website: "https://www.oeko-tex.com/en/our-standards/made-in-green-by-oeko-tex",
                  },
                  {
                    name: "EWG Verified",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285553/EWGVerified.jpg",
                    website: "https://www.ewg.org/ewgverified/",
                  },
                  {
                    name: "EWG VERIFIED for Baby Products",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285553/EWGVerified.jpg",
                    website: "https://www.ewg.org/ewgverified/",
                  },
                  {
                    name: "EWG VERIFIED for Cleaning Products",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285553/EWGVerified.jpg",
                    website: "https://www.ewg.org/ewgverified/",
                  },
                  {
                    name: "EWG VERIFIED for Cosmetics",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285553/EWGVerified.jpg",
                    website: "https://www.ewg.org/ewgverified/",
                  },
                  {
                    name: "Made Safe",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/MadeSafe.jpg",
                    website: "https://www.madesafe.org/",
                  },
                  {
                    name: "EPA Safer Choice",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285551/EPASaferChoice.jpg",
                    website: "https://www.epa.gov/saferchoice",
                  },
                  {
                    name: "Blue Angel",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285566/BlueAngel.jpg",
                    website: "https://www.blauer-engel.de/en",
                  },
                  {
                    name: "Bluesign",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285552/Bluesign.jpg",
                    website: "https://www.bluesign.com/en",
                  },
                  {
                    name: "Leaping Bunny",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/MadeSafe.jpg",
                    website: "https://www.leapingbunny.org/",
                  },
                  {
                    name: "PETA Cruelty Free",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/MadeSafe.jpg",
                    website: "https://www.peta.org/",
                  },
                  {
                    name: "The Vegan Society Trademark",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/MadeSafe.jpg",
                    website: "https://www.vegansociety.com/",
                  },
                  {
                    name: "Certified Vegan",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/MadeSafe.jpg",
                    website: "https://vegan.org/",
                  },
                ].map((cert, index) => (
                  <a
                    key={index}
                    href={cert.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:scale-105 group"
                    style={{ borderColor: "#FEF2F2" }}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <img
                        src={cert.logo || "/placeholder.svg"}
                        alt={cert.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p
                      className="text-xs font-medium text-center group-hover:text-red-600 transition-colors"
                      style={{ color: "#0F172A" }}
                    >
                      {cert.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {selectedCertificationTab === "business" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>
                  Business Ethics & Governance
                </h3>
                <p className="text-lg" style={{ color: "#475569" }}>
                  Certifications that evaluate overall business practices, governance, and social responsibility
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  {
                    name: "BCorp Certified",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Certified_B_Corporation_B_Corp_Logo_2022_Black_RGB.svg/1200px-Certified_B_Corporation_B_Corp_Logo_2022_Black_RGB.svg.png",
                    website: "https://www.bcorporation.net/en-us/certification/",
                  },
                  {
                    name: "Green Seal",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285569/GreenSealLogo.jpg",
                    website: "https://greenseal.org/",
                  },
                  {
                    name: "Green America Gold Certified",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285569/GreenSealLogo.jpg",
                    website: "https://www.greenamerica.org/",
                  },
                  {
                    name: "Nordic Swan Ecolabel",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285570/NordicSwanEcolabel.jpg",
                    website: "https://www.nordic-ecolabel.org/",
                  },
                  {
                    name: "TCO Certified",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285551/TCOCertified.jpg",
                    website: "https://tcocertified.com/tco-certified/",
                  },
                  {
                    name: "Sustainable Apparel Coalition (SAC)",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Certified_B_Corporation_B_Corp_Logo_2022_Black_RGB.svg/1200px-Certified_B_Corporation_B_Corp_Logo_2022_Black_RGB.svg.png",
                    website: "https://apparelcoalition.org/",
                  },
                  {
                    name: "Textile Exchange",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285568/GlobalOrganicTextileStandard.jpg",
                    website: "https://textileexchange.org/",
                  },
                  {
                    name: "Good On You",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285569/GreenSealLogo.jpg",
                    website: "https://goodonyou.eco/",
                  },
                  {
                    name: "Higg Index",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Certified_B_Corporation_B_Corp_Logo_2022_Black_RGB.svg/1200px-Certified_B_Corporation_B_Corp_Logo_2022_Black_RGB.svg.png",
                    website: "https://apparelcoalition.org/the-higg-index/",
                  },
                ].map((cert, index) => (
                  <a
                    key={index}
                    href={cert.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:scale-105 group"
                    style={{ borderColor: "#EFF6FF" }}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <img
                        src={cert.logo || "/placeholder.svg"}
                        alt={cert.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p
                      className="text-xs font-medium text-center group-hover:text-blue-600 transition-colors"
                      style={{ color: "#0F172A" }}
                    >
                      {cert.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {selectedCertificationTab === "quality" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>
                  Quality & Manufacturing
                </h3>
                <p className="text-lg" style={{ color: "#475569" }}>
                  Certifications that ensure high-quality manufacturing processes, safety standards, and product
                  excellence
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  {
                    name: "ISO 9001 Quality Management",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285551/TCOCertified.jpg",
                    website: "https://www.iso.org/iso-9001-quality-management.html",
                  },
                  {
                    name: "ISO 22716 Good Manufacturing Practices",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285551/TCOCertified.jpg",
                    website: "https://www.iso.org/",
                  },
                  {
                    name: "NSF International",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285551/TCOCertified.jpg",
                    website: "https://www.nsf.org/",
                  },
                  {
                    name: "NSF/ANSI 305",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285551/TCOCertified.jpg",
                    website: "https://www.nsf.org/",
                  },
                  {
                    name: "BIFMA LEVEL",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285565/BIFMALEVEL.jpg",
                    website: "https://www.bifma.org/page/level",
                  },
                  {
                    name: "CertiPUR-US",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285551/TCOCertified.jpg",
                    website: "https://certipur.us/",
                  },
                  {
                    name: "GREENGUARD",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285569/GreenSealLogo.jpg",
                    website: "https://www.greenguard.org/",
                  },
                  {
                    name: "GREENGUARD Gold",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285569/GreenSealLogo.jpg",
                    website: "https://www.greenguard.org/",
                  },
                  {
                    name: "EPEAT",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285557/EPEAT.jpg",
                    website: "https://globalelectronicscouncil.org/ecolabels/",
                  },
                  {
                    name: "Gluten-Free Certification Organization",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285551/TCOCertified.jpg",
                    website: "https://www.gfco.org/",
                  },
                  {
                    name: "asthma & allergy friendly CERTIFIED",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285551/TCOCertified.jpg",
                    website: "https://www.asthmaandallergyfoundation.org/",
                  },
                  {
                    name: "Leather Working Group (LWG)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707284585/leather-working-group.jpg",
                    website: "https://www.leatherworkinggroup.com/",
                  },
                ].map((cert, index) => (
                  <a
                    key={index}
                    href={cert.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:scale-105 group"
                    style={{ borderColor: "#E9D5FF" }}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <img
                        src={cert.logo || "/placeholder.svg"}
                        alt={cert.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p
                      className="text-xs font-medium text-center group-hover:text-purple-600 transition-colors"
                      style={{ color: "#0F172A" }}
                    >
                      {cert.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {selectedCertificationTab === "diversity" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#0F172A" }}>
                  Diversity & Inclusion
                </h3>
                <p className="text-lg" style={{ color: "#475569" }}>
                  Certifications that recognize businesses owned by underrepresented groups and promote diversity in
                  supply chains
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[
                  {
                    name: "Women's Business Enterprise (WBENC)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/MadeSafe.jpg",
                    website: "https://www.wbenc.org/",
                  },
                  {
                    name: "Minority Business Enterprise (MBE)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/MadeSafe.jpg",
                    website: "https://www.nmsdc.org/",
                  },
                  {
                    name: "Disability-Owned Business Enterprise (DOBE)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/MadeSafe.jpg",
                    website: "https://www.disabilityin.org/",
                  },
                  {
                    name: "Veteran Disability-Owned Business (V-DOBE)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/MadeSafe.jpg",
                    website: "https://www.va.gov/",
                  },
                  {
                    name: "Service-Disabled Veteran (SDV-DOBE)",
                    logo: "https://res.cloudinary.com/dwmpianpg/image/upload/v1707285549/MadeSafe.jpg",
                    website: "https://www.va.gov/",
                  },
                ].map((cert, index) => (
                  <a
                    key={index}
                    href={cert.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 hover:scale-105 group"
                    style={{ borderColor: "#FCE7F3" }}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <img
                        src={cert.logo || "/placeholder.svg"}
                        alt={cert.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p
                      className="text-xs font-medium text-center group-hover:text-pink-600 transition-colors"
                      style={{ color: "#0F172A" }}
                    >
                      {cert.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
