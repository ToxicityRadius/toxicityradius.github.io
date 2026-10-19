import test from 'node:test';
import assert from 'node:assert/strict';
import { stat } from 'node:fs/promises';
import { projects, evidence, milestones } from '../scripts/portfolio-content.mjs';

test('every featured project has source evidence available to its exhibit', async () => {
  assert.equal(new Set(projects.map(project => project.slug)).size, projects.length);
  assert.deepEqual(Object.keys(evidence).sort(), projects.map(project => project.slug).sort());
  for (const project of projects) {
    const item = evidence[project.slug];
    assert.ok(item.alt && item.caption && item.width > 0 && item.height > 0);
    assert.ok((await stat(`images/${item.file}`)).isFile());
    assert.ok(project.steps.length > 0 && project.decisions.length > 0);
  }
});

test('shared facts retain project attribution and evidence limitations', () => {
  assert.equal(projects[0].role, 'Co-creator & major contributor');
  assert.match(evidence['student-advising-portal'].caption, /fictional demo student data/);
  assert.match(evidence.formproof.caption, /not a new evaluation or WCAG certification/);
  assert.match(evidence.claimcheck.caption, /illustrative fixtures; live inference is disabled/);
  assert.equal(milestones.length, 5);
  assert.match(milestones[3][2], /Past role/);
});
