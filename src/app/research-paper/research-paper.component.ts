import { Component, OnInit } from '@angular/core';
import {ResearchPaper} from "./research-paper";

@Component({
  selector: 'app-research-paper',
  templateUrl: './research-paper.component.html',
  styleUrls: ['./research-paper.component.css']
})

export class ResearchPaperComponent implements OnInit {
  researchPaper4: ResearchPaper = {
    id: 4,
    title: 'Interactively Assessing Disentanglement in GANs',
    author0: 'Sangwon Jeong',
    author1: 'Shushen Liu',
    author2: 'Matthew Berger',
    doi: '',
    venue: 'EuroVis',
    year: 2022,
    month: 6
  };

  researchPaper3: ResearchPaper = {
    id: 3,
    title: 'Enhancing Work Trade Image Classification Performance Using a Work Dependency Graph',
    author0: 'Sangwon Jeong',
    author1: 'Kichang Jeong',
    author2: '',
    doi: 'https://doi.org/10.6106/KJCEM.2021.22.1.106',
    venue: 'Korea Institute of Construction Engineering and Management',
    year: 2021,
    month: 1
  }

  researchPaper2: ResearchPaper = {
    id: 2,
    title: 'Comparing String Similarity Algorithms for Recognizing Task Names Found in Construction Documents',
    author0: 'Sangwon Jeong',
    author1: 'Kichang Jeong',
    author2: '',
    doi: 'https://doi.org/10.6106/KJCEM.2020.21.6.125',
    venue: 'Korea Institute of Construction Engineering and Management',
    year: 2020,
    month: 9
  }

  researchPaper1: ResearchPaper = {
    id: 1,
    title: 'Investigating Noise Robustness of Convolutional Neural Networks for Image Classification Using Gabor Filters',
    author0: 'Sangwon Jeong',
    author1: '',
    author2: '',
    doi: '',
    venue: 'Vanderbilt, Master\'s Thesis',
    year: 2020,
    month: 6
  }

  researchPaper0: ResearchPaper = {
    id: 0,
    title: '한-중미 FTA 분석',
    author0: '정상원',
    author1: '',
    author2: '',
    doi: '',
    venue: 'Seokyeong University, Graduation Thesis',
    year: 2017,
    month: 6
  }

  constructor() {
  }

  ngOnInit(): void {

  }
}

