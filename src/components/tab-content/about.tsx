import LoveSticker from "@/assets/love";

const About = () => {
  return (
    <div className="relative mt-6 mb-4 h-[264px] overflow-hidden rounded-[40px] border-b-4 border-l-4 border-black bg-white px-6 py-6 md:h-[336px] md:border-b-8 md:border-l-8 md:px-10 md:pt-10">
      <p className="text-sm font-semibold md:text-xl">
        When I’m not fine-tuning pixels or wrangling TypeScript, you’ll probably
        find me on YouTube or passionately watching Chelsea FC’s match💙
      </p>

      <LoveSticker className="absolute bottom-0 left-0 z-5" />

      <img
        src="./palmer.png"
        alt="Cole Palmer"
        className="absolute right-0 bottom-0 h-[160px] md:h-auto"
      />
    </div>
  );
};

export default About;
