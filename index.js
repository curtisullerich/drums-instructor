/**
 * @title drums-instructor
 * @artist curtisullerich
 */

export function dsp(t) {
  t *= 2;
  // print_beat(t);

  sample_all_drums(t);
  // sample_toms(t);

  return mix_sample();
}

import snare from 'jd-code/groovit/master/SAMPLES/SNAR_13D.WAV';
import hihat from 'pdv/webmpc/master/sounds/r909/909hat.wav';
import kick from 'pdv/webmpc/master/sounds/r909/909BD.wav';
import ltom from 'pdv/webmpc/master/sounds/r909/909ltom.wav';
import mtom from 'pdv/webmpc/master/sounds/r909/909mtom.wav';
import htom from 'pdv/webmpc/master/sounds/r909/909hitom.wav';
import clap from 'pdv/webmpc/master/sounds/r909/909clap.wav';
import ride from 'pdv/webmpc/master/sounds/r909/909ride.wav';
import Sampler from 'stagas/sampler';

var drums = Sampler(8);
drums.tune(1.1);
drums.add('snare', snare);
drums.add('hihat', hihat);
drums.add('kick', kick);
drums.add('htom', htom);
drums.add('mtom', mtom);
drums.add('ltom', ltom);
drums.add('clap', clap);
drums.add('ride', ride);

// Play instrument 'drum' on 'beat'.
function play_on_beat(t, beat, drum) {
  if (((t + beat) % 4) < 1/22050) {
    drums.play(drum, 1, 1);
  }
}

// Play instrument 'drum' on every beat in 'beats', given time t.
function play_on_beats(t, beats, drum) {
  var len = beats.length;
  for (var i = 0; i < len; i++) {
    play_on_beat(t, beats[i], drum);
  }
}

// Mix the drums together and return a sample.
function mix_sample() {
  var sample = 0.8 * (
    drums.mix() * 0.17
  );
  return sample;
}

// Logs t if it's a whole number.
function print_beat(t) {
  if (t % 1 == 0) {
    console.log(t);
  }
}

function sample_all_drums(t) {
  play_on_beat(t, 0, 'htom');
  play_on_beat(t, 0.5, 'mtom');
  play_on_beat(t, 1, 'ltom');
  play_on_beat(t, 1.5, 'ride');
  play_on_beat(t, 2, 'clap');
  if (Math.random() < 0.5) {
    play_on_beat(t, 2.5, 'hihat');
    play_on_beat(t, 3, 'rim');
  }
  play_on_beat(t, 3.5, 'hihat');
}

function sample_quarter_punk(t) {
  play_on_beats(t, [0,1.5,2.5,3.5], 'kick');
  play_on_beats(t, [1,3], 'snare');
  play_on_beats(t, [0,1,2,3], 'ride');
}

function sample_eight_rock(t) {
  play_on_beats(t, [0,.5,1.5,2.25,3.5], 'kick');
  play_on_beats(t, [1,3], 'snare');
  play_on_beats(t, [0.5,1.5,2.5,3.5], 'hihat');
}

function sample_sixteenth_funk(t) {
  play_on_beats(t, [0,0.75,2,2.25,2.75,3.75], 'kick');
  play_on_beats(t, [1,1.75,3,3.25], 'snare');
  play_on_beats(t, [0, 0.25, 0.75, 1, 1.25,1.75,2, 2.25,2.75,3, 3.25,3.75], 'hihat');
}

function sample_triplet_swing(t) {
  play_on_beats(t, [0,1+2/3,2], 'kick');
  play_on_beats(t, [1,3,3+2/3], 'snare');
  play_on_beats(t, [0,1,1+2/3,2,2+2/3,3,3+2/3], 'ride');
}

function sample_toms(t) {
  // play_on_beats(t, [0,1/4,1/2,  3/2,2,5/2,7/2], 'ltom');
  play_on_beats(t, [1.75], 'htom');
  play_on_beats(t, [2.25], 'mtom');
  play_on_beats(t, [1,3,3.5], 'toms');
  play_on_beats(t, [0,.5,1,1.5,2,2.5,3], 'ltom');
  play_on_beats(t, [0,2,2.5], 'kick');
}

function sample_tom_clap(t) {
  play_on_beats(t, [0,2.25,3.5], 'ltom');
  play_on_beats(t, [.5,1.5], 'mtom');
  play_on_beats(t, [1], 'htom');
  play_on_beats(t, [1,3], 'clap');
  play_on_beats(t, [0.5,1.5,2.5,3.5], 'hihat');
}

function sample_new(t) {
  play_on_beats(t, [], 'kick');
  play_on_beats(t, [], 'snare');
  play_on_beats(t, [], 'hihat');
}

