#!/usr/bin/env python3
"""
Check for missing team car images
Compares required images against existing files
"""

import json
import os
from pathlib import Path
from typing import List, Dict

# Base paths
BASE_DIR = Path(__file__).parent.parent
TEAMS_DIR = BASE_DIR / "teams"
CARS_DIR = TEAMS_DIR / "cars"

# Required team images configuration
TEAM_CONFIG = {
    "red_bull": {
        "name": "Red Bull Racing",
        "years": ["2022", "2023", "2024", "2025"]
    },
    "ferrari": {
        "name": "Ferrari",
        "years": ["2022", "2023", "2024", "2025"]
    },
    "mercedes": {
        "name": "Mercedes",
        "years": ["2022", "2023", "2024", "2025"]
    },
    "mclaren": {
        "name": "McLaren",
        "years": ["2022", "2023", "2024", "2025"]
    },
    "aston_martin": {
        "name": "Aston Martin",
        "years": ["2022", "2023", "2024", "2025"]
    },
    "alpine": {
        "name": "Alpine",
        "years": ["2022", "2023", "2024", "2025"]
    },
    "williams": {
        "name": "Williams",
        "years": ["2022", "2023", "2024", "2025"]
    },
    "rb": {
        "name": "Racing Bulls / AlphaTauri",
        "years": ["2022", "2023", "2024", "2025"]
    },
    "sauber": {
        "name": "Kick Sauber / Alfa Romeo",
        "years": ["2022", "2023", "2024", "2025"]
    },
    "haas": {
        "name": "Haas F1 Team",
        "years": ["2022", "2023", "2024", "2025"]
    },
}

# Alternative naming patterns for teams that changed names
ALT_NAMES = {
    "rb": ["alphatauri", "racingbulls"],
    "sauber": ["alfaromeo", "kicksauber"],
}


def get_possible_filenames(team_id: str, year: str) -> List[str]:
    """Generate possible filenames for a team car image"""
    filenames = []
    
    # Standard naming: team-year.png
    filenames.append(f"{team_id}-{year}.png")
    
    # Alternative names
    if team_id in ALT_NAMES:
        for alt in ALT_NAMES[team_id]:
            filenames.append(f"{alt}-{year}.png")
    
    # Generic fallback
    filenames.append(f"{team_id}.png")
    
    return filenames


def check_team_images(team_id: str, config: Dict) -> Dict:
    """Check images for a specific team"""
    result = {
        "team_name": config["name"],
        "missing": [],
        "found": []
    }
    
    for year in config["years"]:
        found = False
        possible_files = get_possible_filenames(team_id, year)
        
        for filename in possible_files:
            filepath = CARS_DIR / filename
            if filepath.exists():
                result["found"].append({
                    "year": year,
                    "file": filename,
                    "path": str(filepath.relative_to(BASE_DIR))
                })
                found = True
                break
        
        if not found:
            result["missing"].append({
                "year": year,
                "expected_files": possible_files
            })
    
    return result


def generate_report():
    """Generate full image status report"""
    print("F1 Team Car Images Check")
    print("=" * 60)
    
    # Ensure directories exist
    CARS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Check existing files
    existing_files = list(CARS_DIR.glob("*.png")) + list(CARS_DIR.glob("*.jpg")) + list(CARS_DIR.glob("*.jpeg"))
    print(f"\nExisting car images: {len(existing_files)}")
    for f in existing_files:
        print(f"  [OK] {f.name}")
    
    print(f"\n{'='*60}")
    print("Checking required images by team/year:")
    print(f"{'='*60}\n")
    
    all_missing = []
    
    for team_id, config in TEAM_CONFIG.items():
        result = check_team_images(team_id, config)
        
        if result["missing"]:
            print(f"\n[MISSING] {result['team_name']}")
            print(f"   Team ID: {team_id}")
            for missing in result["missing"]:
                print(f"   Missing {missing['year']}: {', '.join(missing['expected_files'])}")
                all_missing.append({
                    "team": result["team_name"],
                    "team_id": team_id,
                    "year": missing["year"],
                    "expected": missing["expected_files"]
                })
        else:
            print(f"\n[OK] {result['team_name']} - All images found")
            for found in result["found"]:
                print(f"   {found['year']}: {found['file']}")
    
    # Generate missing images report
    if all_missing:
        print(f"\n{'='*60}")
        print("SUMMARY: Missing Images")
        print(f"{'='*60}")
        print(f"\nTotal missing: {len(all_missing)} images\n")
        
        # Group by year
        by_year = {}
        for item in all_missing:
            year = item["year"]
            if year not in by_year:
                by_year[year] = []
            by_year[year].append(item)
        
        for year in sorted(by_year.keys()):
            print(f"\n{year} Season:")
            for item in by_year[year]:
                print(f"  - {item['team']}: {item['expected'][0]}")
        
        # Save report to JSON
        report_file = BASE_DIR / "missing_images_report.json"
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump({
                "missing": all_missing,
                "by_year": by_year,
                "total_missing": len(all_missing),
                "notes": {
                    "recommended_format": "PNG with transparent background",
                    "recommended_size": "800x400 pixels or similar aspect ratio",
                    "naming_convention": "team-year.png (e.g., redbull-2024.png)",
                    "save_location": str(CARS_DIR.relative_to(BASE_DIR))
                }
            }, f, indent=2, ensure_ascii=False)
        
        print(f"\n[REPORT] Detailed report saved to: {report_file.name}")
        print(f"\n[INFO] Please add the missing images to: {CARS_DIR}")
        
    else:
        print(f"\n{'='*60}")
        print("[OK] ALL IMAGES FOUND!")
        print(f"{'='*60}")
    
    return len(all_missing) == 0


def main():
    """Main function"""
    success = generate_report()
    
    print(f"\n{'='*60}")
    print("Next Steps:")
    print(f"{'='*60}")
    print("1. Add missing car images to the teams/cars folder")
    print("2. Use PNG format with transparent backgrounds")
    print("3. Recommended size: 800x400 pixels")
    print("4. Naming: team-year.png (e.g., redbull-2024.png)")
    print("\n5. After adding images, run this script again to verify")
    
    return 0 if success else 1


if __name__ == "__main__":
    exit(main())
