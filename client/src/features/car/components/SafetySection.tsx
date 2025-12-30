import { Shield } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { Award } from 'lucide-react';
import type { ICar } from '../carApis';

const SafetySection = ({ car }: { car: ICar }) => (
  <SectionWrapper id="safety" title=" Safety Features" icon={<Shield className="w-5 h-5" />}>
    {car.ncapRating && (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-4">
        <Award className="w-12 h-12 text-green-600" />
        <div>
          <p className="font-semibold text-slate-900">NCAP Safety Rating</p>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-2xl ${i < car.ncapRating ? 'text-yellow-400' : 'text-slate-300'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Airbags</p>
        <p className="text-xl font-bold text-slate-900">{car.airbags} Airbags</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">ABS</p>
        <p className="text-xl font-bold text-slate-900">
          {car.abs ? '✓ Available' : '✗ Not Available'}
        </p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">EBD</p>
        <p className="text-xl font-bold text-slate-900">
          {car.ebd ? '✓ Available' : '✗ Not Available'}
        </p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">ESC</p>
        <p className="text-xl font-bold text-slate-900">
          {car.esc ? '✓ Available' : '✗ Not Available'}
        </p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Traction Control</p>
        <p className="text-xl font-bold text-slate-900">
          {car.tractionControl ? '✓ Available' : '✗ Not Available'}
        </p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Hill Assist</p>
        <p className="text-xl font-bold text-slate-900">
          {car.hillAssist ? '✓ Available' : '✗ Not Available'}
        </p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">ISOFIX</p>
        <p className="text-xl font-bold text-slate-900">
          {car.isofix ? '✓ Available' : '✗ Not Available'}
        </p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Parking Sensors</p>
        <p className="text-xl font-bold text-slate-900">{car.parkingSensors}</p>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 mb-1">Reverse Camera</p>
        <p className="text-xl font-bold text-slate-900">
          {car.reverseCamera ? '✓ Available' : '✗ Not Available'}
        </p>
      </div>
    </div>

    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-800">Braking System</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-between py-2 border-b border-slate-200">
          <span className="text-slate-600">Front Brake</span>
          <span className="font-semibold text-slate-900">{car.frontBrakeType}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-200">
          <span className="text-slate-600">Rear Brake</span>
          <span className="font-semibold text-slate-900">{car.rearBrakeType}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-200 md:col-span-2">
          <span className="text-slate-600">Braking System</span>
          <span className="font-semibold text-slate-900">{car.brakingSystem}</span>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default SafetySection;
