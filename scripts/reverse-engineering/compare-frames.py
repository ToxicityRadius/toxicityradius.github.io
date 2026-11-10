"""Compare equally sized, matched-state frames; report metrics, not a design verdict."""
import argparse
import json

import numpy as np
from PIL import Image
from skimage.metrics import structural_similarity

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('reference')
parser.add_argument('implementation')
args = parser.parse_args()
with Image.open(args.reference) as image:
    reference = np.asarray(image.convert('RGB'))
with Image.open(args.implementation) as image:
    implementation = np.asarray(image.convert('RGB'))
if reference.shape != implementation.shape:
    parser.error('Frame dimensions differ. Capture the same viewport and state; do not resize to hide the mismatch.')
if min(reference.shape[:2]) < 7:
    parser.error('Frames must be at least 7 pixels on each side for SSIM.')
delta = np.abs(reference.astype(np.int16) - implementation.astype(np.int16))
print(json.dumps({
    'mean_absolute_error_0_255': float(delta.mean()),
    'changed_pixel_fraction': float(np.any(delta != 0, axis=2).mean()),
    'ssim': float(structural_similarity(reference, implementation, channel_axis=2, data_range=255)),
    'interpretation': 'Diagnostic only; requires matched viewport, state, font readiness, theme, and motion preference.'
}, indent=2))
