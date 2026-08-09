import { type OpaqueColorValue, Platform } from 'react-native';

import ActivityIcon from '@/assets/icons/activity.svg';
import ArrowForwardIcon from '@/assets/icons/arrow-forward.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import BarChartIcon from '@/assets/icons/bar-chart.svg';
import BellIcon from '@/assets/icons/bell.svg';
import BodyIcon from '@/assets/icons/body.svg';
import BrainIcon from '@/assets/icons/brain.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import CheckIcon from '@/assets/icons/check.svg';
import CheckDoubleIcon from '@/assets/icons/check-double.svg';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import DocumentsIcon from '@/assets/icons/documents.svg';
import EditIcon from '@/assets/icons/edit.svg';
import EyeIcon from '@/assets/icons/eye.svg';
import EyeOffIcon from '@/assets/icons/eye-off.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import HomeIcon from '@/assets/icons/home.svg';
import ImagesIcon from '@/assets/icons/images.svg';
import InfoIcon from '@/assets/icons/info.svg';
import KidneysIcon from '@/assets/icons/kidneys.svg';
import LiverIcon from '@/assets/icons/liver.svg';
import LockIcon from '@/assets/icons/lock.svg';
import LungsIcon from '@/assets/icons/lungs.svg';
import MailIcon from '@/assets/icons/mail.svg';
import MoreIcon from '@/assets/icons/more.svg';
import PatientIcon from '@/assets/icons/patient.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import ReticleIcon from '@/assets/icons/reticle.svg';
import SearchIcon from '@/assets/icons/search.svg';
import ShieldIcon from '@/assets/icons/shield.svg';
import SpineIcon from '@/assets/icons/spine.svg';
import StatusIcon from '@/assets/icons/status.svg';
import StethoscopeIcon from '@/assets/icons/stethoscope.svg';
import StomachIcon from '@/assets/icons/stomach.svg';
import TrendIcon from '@/assets/icons/trend.svg';
import UploadIcon from '@/assets/icons/upload.svg';
import WarningTriangleIcon from '@/assets/icons/warning-triangle.svg';
import WholeBodyIcon from '@/assets/icons/whole-body.svg';
import XIcon from '@/assets/icons/x.svg';

const REGISTRY = {
  activity: ActivityIcon,
  'arrow-forward': ArrowForwardIcon,
  body: BodyIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  'bar-chart': BarChartIcon,
  bell: BellIcon,
  brain: BrainIcon,
  calendar: CalendarIcon,
  check: CheckIcon,
  'check-double': CheckDoubleIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  documents: DocumentsIcon,
  edit: EditIcon,
  eye: EyeIcon,
  'eye-off': EyeOffIcon,
  heart: HeartIcon,
  home: HomeIcon,
  images: ImagesIcon,
  info: InfoIcon,
  kidneys: KidneysIcon,
  liver: LiverIcon,
  lock: LockIcon,
  mail: MailIcon,
  lungs: LungsIcon,
  more: MoreIcon,
  patient: PatientIcon,
  plus: PlusIcon,
  reticle: ReticleIcon,
  search: SearchIcon,
  shield: ShieldIcon,
  spine: SpineIcon,
  status: StatusIcon,
  stethoscope: StethoscopeIcon,
  stomach: StomachIcon,
  trend: TrendIcon,
  upload: UploadIcon,
  'warning-triangle': WarningTriangleIcon,
  'whole-body': WholeBodyIcon,
  x: XIcon,
} as const;

export type IconName = keyof typeof REGISTRY;

type Props = {
  name: IconName;
  size?: number;
  color: string | OpaqueColorValue;
  accessibilityLabel?: string;
};

export function Icon({ name, size = 24, color, accessibilityLabel }: Props) {
  const Svg = REGISTRY[name];
  const decorative = !accessibilityLabel;

  const a11yProps =
    Platform.OS === 'web'
      ? decorative
        ? { 'aria-hidden': true as const }
        : { role: 'img' as const, 'aria-label': accessibilityLabel }
      : {
          accessible: !decorative,
          accessibilityRole: decorative ? undefined : ('image' as const),
          accessibilityLabel,
          importantForAccessibility: decorative ? ('no' as const) : ('yes' as const),
        };

  return <Svg width={size} height={size} color={color as string} {...a11yProps} />;
}
