import { expect, test, type Locator } from '@playwright/test';

const readCanvasFrame = (canvas: Locator) =>
  canvas.evaluate((element) => {
    const gameCanvas = element as HTMLCanvasElement;
    return gameCanvas.toDataURL();
  });

test('carrega, desenha no Canvas e aceita o fluxo principal de teclado', async ({ page }) => {
  const browserProblems: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      browserProblems.push(message.text());
    }
  });
  page.on('pageerror', (error) => browserProblems.push(error.message));

  await page.goto('/');

  await expect(page).toHaveTitle(/Labirinto Lumina/);

  const canvas = page.locator('canvas.lumina-canvas');
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveAttribute('aria-label', /Labirinto Lumina/);

  await expect
    .poll(async () =>
      canvas.evaluate((element) => {
        const gameCanvas = element as HTMLCanvasElement;
        const context = gameCanvas.getContext('2d');

        if (!context || gameCanvas.width === 0 || gameCanvas.height === 0) {
          return false;
        }

        const pixels = context.getImageData(0, 0, gameCanvas.width, gameCanvas.height).data;

        for (let index = 0; index < pixels.length; index += 4) {
          const alpha = pixels[index + 3] ?? 0;
          const red = pixels[index] ?? 0;
          const green = pixels[index + 1] ?? 0;
          const blue = pixels[index + 2] ?? 0;

          if (alpha > 0 && (red > 0 || green > 0 || blue > 0)) {
            return true;
          }
        }

        return false;
      }),
    )
    .toBe(true);

  const startFrame = await readCanvasFrame(canvas);

  await page.keyboard.press('KeyC');
  await expect.poll(async () => readCanvasFrame(canvas)).not.toBe(startFrame);

  await page.keyboard.press('Escape');
  await page.keyboard.press('Enter');

  const playingFrame = await readCanvasFrame(canvas);

  await page.keyboard.press('KeyP');
  await expect.poll(async () => readCanvasFrame(canvas)).not.toBe(playingFrame);

  await page.keyboard.press('KeyM');
  await page.keyboard.press('KeyP');

  expect(browserProblems).toEqual([]);
});
