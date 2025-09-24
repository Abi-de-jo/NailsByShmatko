import { translations } from "../../data/translations"

 

const Logo = () => {
    return (
        <div className="sticky z-40 flex justify-center items-center">
            <div className="flex justify-center items-center py-4 md:py-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1c0038] text-center">
                    {translations.uk.businessName}
                </h1>
            </div>
        </div>
    )
}

export default Logo