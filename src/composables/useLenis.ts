import Lenis from "lenis";
import { onMounted, onUnmounted } from "vue";

export function useLenis() {
  let lenis: Lenis;

  onMounted(() => {
    lenis = new Lenis({
      duration: 2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  onUnmounted(() => {
    lenis.destroy();
  });
}
