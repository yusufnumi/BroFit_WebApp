import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Dumbbell, 
  Users, 
  Clock, 
  Award,
  ChevronRight,
  Star,
  Activity,
  Heart,
  Bike,
  Music
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Dumbbell,
      title: 'Modern Equipment',
      description: 'State-of-the-art fitness equipment for all your workout needs'
    },
    {
      icon: Users,
      title: 'Expert Trainers',
      description: 'Certified professionals to guide your fitness journey'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Open early morning to late night, 7 days a week'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Join thousands who have transformed their lives with us'
    }
  ];

  const classTypes = [
    { icon: Heart, name: 'Yoga', color: 'bg-purple-100 text-purple-600' },
    { icon: Bike, name: 'Cycling', color: 'bg-blue-100 text-blue-600' },
    { icon: Activity, name: 'HIIT', color: 'bg-orange-100 text-orange-600' },
    { icon: Music, name: 'Zumba', color: 'bg-yellow-100 text-yellow-600' }
  ];

  const testimonials = [
    {
      name: 'Alex Turner',
      role: 'Member since 2024',
      text: 'BroFit changed my life! The trainers are amazing and the facilities are top-notch. I\'ve never felt better.',
      rating: 5
    },
    {
      name: 'Maria Santos',
      role: 'Member since 2023',
      text: 'The variety of classes keeps me motivated. I especially love the Zumba sessions - so much fun!',
      rating: 5
    },
    {
      name: 'James Wilson',
      role: 'Member since 2024',
      text: 'Great atmosphere, clean facilities, and the booking system is super convenient. Highly recommend!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6bTAgMTJ2Nmg2di02aC02em0wIDEydjZoNnYtNmgtNnptLTEyLTEydjZoNnYtNmgtNnptMCAxMnY2aDZ2LTZoLTZ6bTAtMjR2Nmg2di02aC02em0wIDM2djZoNnYtNmgtNnptLTEyLTEydjZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bTAtMTJ2Nmg2di02aC02em0wIDM2djZoNnYtNmgtNnptMzYtMjR2Nmg2di02aC02em0wIDEydjZoNnYtNmgtNnptMC0yNHY2aDZ2LTZoLTZ6bTAgMzZ2Nmg2di02aC02em0xMi0xMnY2aDZ2LTZoLTZ6bTAtMTJ2Nmg2di02aC02em0wLTEydjZoNnYtNmgtNnptMCAzNnY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Body,<br />
              <span className="text-orange-500">Transform Your Life</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join BroFit today and start your fitness journey with expert trainers, 
              modern equipment, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-orange-500">BroFit</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to achieve your fitness goals in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="text-orange-500">Classes</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From high-intensity workouts to relaxing yoga sessions, we have something for everyone
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {classTypes.map((classType, index) => (
              <div
                key={index}
                className={`${classType.color} p-6 rounded-2xl text-center hover:scale-105 transition-transform cursor-pointer`}
              >
                <classType.icon className="h-12 w-12 mx-auto mb-3" />
                <h3 className="font-bold text-lg">{classType.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/classes"
              className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold text-lg transition-colors"
            >
              <span>View All Classes</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">5000+</div>
              <div className="text-gray-400">Active Members</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-400">Weekly Classes</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">15+</div>
              <div className="text-gray-400">Expert Trainers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">10+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-orange-500">Members</span> Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our amazing community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join BroFit today and get access to world-class facilities, expert trainers, 
            and a supportive community.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center space-x-2 bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            <span>View Membership Plans</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
