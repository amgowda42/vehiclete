import type { ICar } from '../carApis';
import SectionWrapper from './SectionWrapper';
import { Wifi } from 'lucide-react';

const TechnologySection = ({ car }: { car: ICar }) => (
  <SectionWrapper
    id="technology"
    title="Technology & Infotainment"
    icon={<Wifi className="w-5 h-5" />}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-slate-900">Display & Audio</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Screen Size</span>
            <span className="font-semibold text-slate-900">{car.infotainmentScreen}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Touchscreen</span>
            <span className="font-semibold text-slate-900">{car.touchscreen ? '✓' : '✗'}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Speakers</span>
            <span className="font-semibold text-slate-900">{car.speakers}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">USB Ports</span>
            <span className="font-semibold text-slate-900">{car.usbPorts}</span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-slate-900">Connectivity</h3>
        <div className="space-y-3">
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Android Auto</span>
            <span className="font-semibold text-slate-900">{car.androidAuto ? '✓' : '✗'}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Apple CarPlay</span>
            <span className="font-semibold text-slate-900">{car.appleCarPlay ? '✓' : '✗'}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Bluetooth</span>
            <span className="font-semibold text-slate-900">
              {car.bluetoothConnectivity ? '✓' : '✗'}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Wireless Charging</span>
            <span className="font-semibold text-slate-900">{car.wirelessCharging ? '✓' : '✗'}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Connected Car</span>
            <span className="font-semibold text-slate-900">
              {car.connectedCarFeatures ? '✓' : '✗'}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-semibold mb-4 text-slate-800">Lighting</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex justify-between py-2 border-b border-slate-200">
          <span className="text-slate-600">Headlights</span>
          <span className="font-semibold text-slate-900">{car.headlightType}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-200">
          <span className="text-slate-600">DRL</span>
          <span className="font-semibold text-slate-900">{car.drl ? '✓' : '✗'}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-200">
          <span className="text-slate-600">Fog Lights</span>
          <span className="font-semibold text-slate-900">{car.fogLights ? '✓' : '✗'}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-200">
          <span className="text-slate-600">Taillights</span>
          <span className="font-semibold text-slate-900">{car.taillightType}</span>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default TechnologySection;
