// Export enhanced VNPlayer as default, with legacy player as fallback
export { VNPlayer } from '../EnhancedVNPlayer'
export type { VNPlayerProps } from '../EnhancedVNPlayer'
export { VNPlayer as LegacyVNPlayer } from '../VNPlayer'
export * from '../portsWeb'
export * from '../assets'

// Enhanced features ported from ChakraHearts
export * from './hooks/useAudio'
export * from './hooks/useVFX'
export * from './hooks/useAssets'
export * from './hooks/useAccessibility';
