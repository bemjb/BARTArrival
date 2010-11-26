#!/usr/bin/env perl

use v5.012;
use strict;
use warnings;
use autodie;
use LWP::UserAgent;
use XML::Twig;
use JSON;
use Carp;

my $out = { };
my $ua = LWP::UserAgent->new;
my $all_stn = $ua->get('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V');
if ($all_stn->is_success) {
    my $stn_doc = XML::Twig->new();
    $stn_doc->parse($all_stn->content);
    my $stns = $stn_doc->root->first_child('stations');
    for my $stn ($stns->children('station')) {
        my $abbr = $stn->first_child('abbr')->trimmed_text;
        say STDERR "Getting geoloc for $abbr";
        my $stn_info = $ua->get("http://api.bart.gov/api/stn.aspx?cmd=stninfo\&orig=$abbr\&key=MW9S-E7SL-26DU-VV8V");
        if ($stn_info->is_success) {
            my $info_doc = XML::Twig->new();
            $info_doc->parse($stn_info->content);
            my $info = $info_doc->root->first_child('stations')->first_child('station');
            $out->{$abbr} = {
                'abbr' => $abbr,
                'name' => $info->first_child('name')->trimmed_text,
                'latitude' => 0+$info->first_child('gtfs_latitude')->trimmed_text,
                'longitude' => 0+$info->first_child('gtfs_longitude')->trimmed_text,
            }
        }
        else {
            croak "Failed to get info: " . $stn_info->as_string;
        }
    }
}
else {
    croak "Failed to get stations: " . $all_stn->as_string
}

say encode_json($out);
