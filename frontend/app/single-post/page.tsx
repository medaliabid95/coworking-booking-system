import Header from "../components/Header";
import Footer from "../components/Footer";



export default function SinglePostPage() {
  return (
    <>
      <Header />
              {/* Hero Section */}
          <section className="relative min-h-[50vh] flex items-center justify-center">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
                alt="image"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-white">

              {/* Top Left Text */}
              <div className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-200">

                <span>ASK Project</span>
                <span className="text-orange-500">/</span>

                <span>May 14, 2023</span>
                <span className="text-orange-500">/</span>

                <span>Future</span>
              </div>

              {/* Main Center Content */}
              <div className="text-center max-w-3xl mx-auto">

                {/* Title */}
                <h2 className="text-5xl mb-4 font-bold whitespace-nowrap">
                  What is jobs market Great Reshuffle?
                </h2>

                {/* Subtitle Text */}
                <p className="text-gray-300 text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
                  luctus nec ullamcorper mattis, pulvinar dapibus leo.
                </p>
              </div>

            </div>
          </section>

     <Footer />
     
    </>
  );
}