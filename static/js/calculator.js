// Earnings Calculator Logic
document.addEventListener('DOMContentLoaded', function() {
    const clicksRange = document.getElementById('clicksRange');
    const clicksValue = document.getElementById('clicksValue');
    const earningsValue = document.getElementById('earningsValue');
    
    // Rate tiers (clicks: rate per 1000 clicks)
    const rates = {
        0: 5,      // $5 per 1000 clicks (default)
        10000: 7,  // $7 per 1000 clicks after 10K
        50000: 10, // $10 per 1000 clicks after 50K
        100000: 20 // $20 per 1000 clicks after 100K
    };
    
    function calculateEarnings(clicks) {
        let earnings = 0;
        let remainingClicks = clicks;
        
        const tiers = Object.entries(rates).sort((a, b) => b[0] - a[0]);
        
        for (let i = 0; i < tiers.length; i++) {
            const [threshold, rate] = tiers[i];
            const nextThreshold = i < tiers.length - 1 ? tiers[i + 1][0] : 0;
            
            if (clicks >= threshold) {
                const tierClicks = remainingClicks - (nextThreshold > 0 ? nextThreshold : 0);
                earnings += (tierClicks * rate) / 1000;
                remainingClicks -= tierClicks;
                
                if (remainingClicks <= 0) break;
            }
        }
        
        return earnings;
    }
    
    function updateCalculator() {
        const clicks = parseInt(clicksRange.value);
        clicksValue.textContent = `${(clicks/1000).toFixed(0)}K`;
        
        const earnings = calculateEarnings(clicks);
        earningsValue.textContent = `$${earnings.toFixed(2)}`;
        
        // Animate the change
        earningsValue.classList.add('text-pulse');
        setTimeout(() => {
            earningsValue.classList.remove('text-pulse');
        }, 500);
    }
    
    clicksRange.addEventListener('input', updateCalculator);
    
    // Initialize calculator
    updateCalculator();
    
    // Add tooltip showing exact rate at current level
    const tooltip = new bootstrap.Tooltip(clicksRange, {
        title: () => {
            const clicks = parseInt(clicksRange.value);
            let rate = 5; // default rate
            
            Object.entries(rates)
                .sort((a, b) => b[0] - a[0])
                .forEach(([threshold, value]) => {
                    if (clicks >= threshold) {
                        rate = value;
                        return;
                    }
                });
                
            return `Current rate: $${rate} per 1000 clicks`;
        },
        placement: 'top'
    });
});
