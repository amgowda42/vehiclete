import type { ICar } from '../carApis';
import SectionWrapper from './SectionWrapper';
import { Sofa } from 'lucide-react';

const ComfortSection = ({ car }: { car: ICar }) => (
  <SectionWrapper id="comfort" title="Comfort & Convenience" icon={<Sofa className="w-5 h-5" />}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Air Conditioning</span>
        <span className="font-semibold text-slate-900">{car.ac}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Power Steering</span>
        <span className="font-semibold text-slate-900">{car.powerSteering ? '✓' : '✗'}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Power Windows</span>
        <span className="font-semibold text-slate-900">{car.powerWindows}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Adjustable Seats</span>
        <span className="font-semibold text-slate-900">{car.adjustableSeats}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Cruise Control</span>
        <span className="font-semibold text-slate-900">{car.cruiseControl ? '✓' : '✗'}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Keyless Entry</span>
        <span className="font-semibold text-slate-900">{car.keylessEntry ? '✓' : '✗'}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Push Button Start</span>
        <span className="font-semibold text-slate-900">{car.pushButtonStart ? '✓' : '✗'}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Sunroof</span>
        <span className="font-semibold text-slate-900">{car.sunroof ? '✓' : '✗'}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Panoramic Sunroof</span>
        <span className="font-semibold text-slate-900">{car.panoramicSunroof ? '✓' : '✗'}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Ventilated Seats</span>
        <span className="font-semibold text-slate-900">{car.ventilatedSeats ? '✓' : '✗'}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-slate-200">
        <span className="text-slate-600">Heated Seats</span>
        <span className="font-semibold text-slate-900">{car.heatedSeats ? '✓' : '✗'}</span>
      </div>
    </div>
  </SectionWrapper>
);

export default ComfortSection;
