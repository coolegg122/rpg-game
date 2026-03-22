const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'gameData.js');
let text = fs.readFileSync(file, 'utf8');

// List of scenes to map
const mapping = {
  court1: 'court1Img',
  conf1: 'conf1Img',
  mishap: 'mishapImg',
  res_gun: 'resGunImg',
  res_chase: 'resChaseImg',
  partner: 'partnerImg',
  court2: 'court2Img',
  conf2: 'conf2Img',
  res2: 'res2Img',
  mayan_end: 'mayanEndImg',
  laoli_end: 'laoliEndImg',
  court3: 'court3Img',
  conf3: 'conf3Img',
  res3_good: 'res3GoodImg',
  res3_bad: 'res3BadImg',
  res3_esc: 'res3EscImg',
  pro4: 'court4Img',
  court4: 'court4Img',
  epi_found: 'epiFoundImg',
  epi_lost: 'epiLostImg',
  mq_end: 'court4Img',
  memorial: 'court4Img'
};

for (const [key, img] of Object.entries(mapping)) {
  // Matches key:[ { ... } , { ... } ], 
  const regex = new RegExp(`(${key}:\\s*\\[)([\\s\\S]+?)\\s*\\],`);
  text = text.replace(regex, (match, p1, p2) => {
    // Add ,bg:img to inside list items that don't already have it
    const items = p2.split('},{').map(item => {
      let cleaned = item.replace(/^[{\s]*/, '').replace(/[}\s]*$/, '');
      if (cleaned.includes('bg:')) return cleaned; // Skip if already mapped
      return cleaned + `,bg:${img}`;
    });
    return `${p1}{${items.join('},{')}}],`;
  });
}

fs.writeFileSync(file, text, 'utf8');
console.log('Successfully and safely updated background mappings!');
