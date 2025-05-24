/**
 * GitAnalytics - Analyzer Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const repoParam = urlParams.get('repo');
  
  // If repo parameter exists, auto-fill the input and trigger analysis
  if (repoParam) {
    const inputField = document.querySelector('.github-input');
    if (inputField) {
      inputField.value = repoParam;
      
      // Show the analysis results section
      const analysisResults = document.getElementById('analysisResults');
      if (analysisResults) {
        analysisResults.style.display = 'block';
        
        // Initialize charts after a short delay to ensure the DOM is ready
        setTimeout(initializeCharts, 500);
      }
    }
  }
  
  // Initialize visualizations and charts
  function initializeCharts() {
    // Language Distribution Chart
    const languageChartEl = document.getElementById('languageChart');
    if (languageChartEl) {
      const languageChart = new Chart(languageChartEl, {
        type: 'doughnut',
        data: {
          labels: ['JavaScript', 'TypeScript', 'CSS', 'HTML', 'Other'],
          datasets: [{
            data: [45, 30, 10, 10, 5],
            backgroundColor: [
              '#F7DF1E', // JavaScript (yellow)
              '#3178C6', // TypeScript (blue)
              '#264DE4', // CSS (blue)
              '#E34F26', // HTML (orange)
              '#6C757D'  // Other (gray)
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw}%`;
                }
              }
            }
          },
          cutout: '65%'
        }
      });
    }
    
    // Commit Activity Chart
    const commitChartEl = document.getElementById('commitChart');
    if (commitChartEl) {
      const commitLabels = [];
      const commitData = [];
      
      // Generate last 12 months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const now = new Date();
      for (let i = 11; i >= 0; i--) {
        const month = new Date(now);
        month.setMonth(now.getMonth() - i);
        commitLabels.push(months[month.getMonth()]);
        
        // Random data between 30 and 120
        commitData.push(Math.floor(Math.random() * 90) + 30);
      }
      
      const commitChart = new Chart(commitChartEl, {
        type: 'line',
        data: {
          labels: commitLabels,
          datasets: [{
            label: 'Commits',
            data: commitData,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: '#3B82F6',
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: '#3B82F6',
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#1E293B',
              titleColor: '#E2E8F0',
              bodyColor: '#E2E8F0',
              borderColor: '#3B82F6',
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: false,
              callbacks: {
                title: function(tooltipItems) {
                  return tooltipItems[0].label + ' 2024';
                },
                label: function(context) {
                  return `${context.raw} commits`;
                }
              }
            }
          }
        }
      });
    }
    
    // Code Structure Chart
    const codeStructureChartEl = document.getElementById('codeStructureChart');
    if (codeStructureChartEl) {
      const codeStructureChart = new Chart(codeStructureChartEl, {
        type: 'radar',
        data: {
          labels: [
            'Modularity',
            'Cohesion',
            'Low Coupling',
            'Code Reuse',
            'Abstraction',
            'Encapsulation'
          ],
          datasets: [{
            label: 'Project Score',
            data: [85, 90, 75, 95, 88, 92],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3B82F6',
            borderWidth: 2,
            pointBackgroundColor: '#3B82F6',
            pointRadius: 4,
            pointHoverRadius: 6
          }, {
            label: 'Industry Average',
            data: [70, 65, 60, 75, 72, 68],
            backgroundColor: 'rgba(148, 163, 184, 0.2)',
            borderColor: '#94A3B8',
            borderWidth: 2,
            pointBackgroundColor: '#94A3B8',
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          scales: {
            r: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20,
                display: false
              },
              pointLabels: {
                font: {
                  size: 12
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              angleLines: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom'
            },
            tooltip: {
              backgroundColor: '#1E293B',
              titleColor: '#E2E8F0',
              bodyColor: '#E2E8F0',
              borderColor: '#3B82F6',
              borderWidth: 1,
              cornerRadius: 8,
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.raw}/100`;
                }
              }
            }
          }
        }
      });
    }
    
    // Quality Trends Chart
    const qualityTrendsChartEl = document.getElementById('qualityTrendsChart');
    if (qualityTrendsChartEl) {
      const qualityTrendsChart = new Chart(qualityTrendsChartEl, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Code Quality Score',
            data: [82, 84, 86, 85, 88, 92],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
              min: 70,
              max: 100,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
    
    // Vulnerability Chart
    const vulnerabilityChartEl = document.getElementById('vulnerabilityChart');
    if (vulnerabilityChartEl) {
      const vulnerabilityChart = new Chart(vulnerabilityChartEl, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Found',
              data: [12, 9, 7, 5, 8, 6],
              backgroundColor: '#F59E0B',
              barPercentage: 0.6,
              categoryPercentage: 0.7
            },
            {
              label: 'Fixed',
              data: [8, 6, 6, 4, 7, 5],
              backgroundColor: '#10B981',
              barPercentage: 0.6,
              categoryPercentage: 0.7
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              title: {
                display: true,
                text: 'Number of Vulnerabilities'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
    
    // Contributors Chart
    const contributorsChartEl = document.getElementById('contributorsChart');
    if (contributorsChartEl) {
      const contributorsChart = new Chart(contributorsChartEl, {
        type: 'pie',
        data: {
          labels: ['Core Team', 'Regular Contributors', 'Occasional Contributors', 'First-time Contributors'],
          datasets: [{
            data: [15, 25, 35, 25],
            backgroundColor: [
              '#3B82F6', // Primary blue
              '#10B981', // Green
              '#F59E0B', // Yellow
              '#94A3B8'  // Gray
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.raw;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${context.label}: ${percentage}% (${value} contributors)`;
                }
              }
            }
          }
        }
      });
    }
  }
  
  // Tab switching functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      const tabPanes = document.querySelectorAll('.tab-pane');
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to current tab
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Analyzer form submission
  const analyzerForm = document.getElementById('analyzerForm');
  if (analyzerForm) {
    analyzerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputField = e.target.querySelector('.github-input');
      if (!inputField) return;
      
      const repoUrl = inputField.value.trim();
      
      // Show the analysis results section
      const analysisResults = document.getElementById('analysisResults');
      if (analysisResults) {
        analysisResults.style.display = 'block';
        
        // Scroll to results
        analysisResults.scrollIntoView({ behavior: 'smooth' });
        
        // Initialize charts
        initializeCharts();
      }
    });
  }
  
  // Popular repos click handler
  const repoTags = document.querySelectorAll('.repo-tag');
  repoTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();
      
      const repo = tag.getAttribute('data-repo');
      const inputField = document.querySelector('.github-input');
      if (inputField) {
        inputField.value = repo;
        
        // Trigger form submission
        const analyzerForm = document.getElementById('analyzerForm');
        if (analyzerForm) {
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          analyzerForm.dispatchEvent(submitEvent);
        }
      }
    });
  });
});