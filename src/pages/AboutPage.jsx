import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Heart, 
  Users, 
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
  Dumbbell,
  HeartPulse,
  Bike,
  Waves,
  Sparkles,
  Lock,
  CupSoda
} from 'lucide-react';
import instructorsData from '../data/instructors.json';
import facilitiesData from '../data/facilities.json';

const facilityIcons = {
  dumbbell: Dumbbell,
  'heart-pulse': HeartPulse,
  users: Users,
  bike: Bike,
  waves: Waves,
  sparkles: Sparkles,
  lock: Lock,
  'cup-soda': CupSoda
};

const AboutPage = () => {

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from our facilities to our training programs.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our team is passionate about fitness and helping our members achieve their goals.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We build a supportive community where everyone feels welcome and motivated.'
    },
    {
      icon: Award,
      title: 'Results',
      description: 'We focus on delivering real, measurable results for every member.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-orange-500">BroFit</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            More than just a gym - we're a community dedicated to helping you become 
            the best version of yourself.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-orange-500">Story</span>
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  BroFit was founded in 2015 with a simple mission: to create a fitness 
                  center that puts its members first. We noticed that many gyms lacked 
                  the personal touch and digital convenience that modern fitness 
                  enthusiasts need.
                </p>
                <p>
                  What started as a small studio has grown into a comprehensive fitness 
                  center with state-of-the-art equipment, expert trainers, and a vibrant 
                  community of over 5,000 members.
                </p>
                <p>
                  Today, BroFit is more than just a gym - it's a place where people come 
                  to transform their lives, make lasting friendships, and achieve things 
                  they never thought possible.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-orange-100">
                "To empower individuals to achieve their fitness goals through 
                exceptional facilities, expert guidance, and a supportive community 
                that celebrates every victory."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-500">Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at BroFit
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-500">Facilities</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              State-of-the-art equipment and amenities for the ultimate fitness experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilitiesData.facilities.map((facility) => {
              const Icon = facilityIcons[facility.icon] || Dumbbell;
              return (
                <div
                  key={facility.id}
                  className="bg-gray-50 p-6 rounded-xl hover:bg-orange-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{facility.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{facility.description}</p>
                  <ul className="space-y-1">
                    {facility.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-xs text-gray-500 flex items-center">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-orange-500">Trainers</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert certified trainers dedicated to helping you reach your fitness goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructorsData.instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{instructor.name}</h3>
                  <p className="text-orange-500 font-medium mb-2">{instructor.specialty}</p>
                  <p className="text-sm text-gray-500 mb-3">{instructor.experience} years experience</p>
                  <p className="text-gray-600 text-sm mb-4">{instructor.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {instructor.certifications.slice(0, 2).map((cert, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In <span className="text-orange-500">Touch</span>
            </h2>
            <p className="text-gray-400">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-gray-400 text-sm">123 Fitness Street<br />Gym City, GC 12345</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-400 text-sm">(555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-400 text-sm">info@brofit.com</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-gray-400 text-sm">Mon-Fri: 5AM - 11PM<br />Sat-Sun: 6AM - 10PM</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/pricing"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Join BroFit Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
