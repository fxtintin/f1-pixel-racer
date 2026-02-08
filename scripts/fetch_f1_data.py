#!/usr/bin/env python3
"""
F1 Data Fetcher for Ground Effect Era (2022-2025)
Fetches and caches F1 data from jolpica-f1 API (Ergast compatible)
"""

import json
import requests
import os
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional

# API Base URL
API_BASE = "https://api.jolpi.ca/ergast/f1"

# Ground Effect Era Years
YEARS = ["2022", "2023", "2024", "2025"]

# Data Directory
DATA_DIR = Path(__file__).parent.parent / "data"


def ensure_data_dir():
    """Ensure data directory exists"""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    for year in YEARS:
        (DATA_DIR / year).mkdir(exist_ok=True)


def fetch_json(url: str) -> Optional[Dict]:
    """Fetch JSON data from API"""
    try:
        print(f"Fetching: {url}")
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None


def save_json(data: Dict, filepath: Path):
    """Save data to JSON file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved: {filepath}")


def fetch_races(year: str):
    """Fetch all races for a season"""
    url = f"{API_BASE}/{year}.json"
    data = fetch_json(url)
    if data:
        save_json(data, DATA_DIR / year / "races.json")
        races = data.get("MRData", {}).get("RaceTable", {}).get("Races", [])
        print(f"Year {year}: {len(races)} races")
        return races
    return []


def fetch_race_results(year: str, round_num: str):
    """Fetch results for a specific race"""
    url = f"{API_BASE}/{year}/{round_num}/results.json"
    data = fetch_json(url)
    if data:
        save_json(data, DATA_DIR / year / f"race_{round_num}_results.json")
        results = data.get("MRData", {}).get("RaceTable", {}).get("Races", [])
        if results:
            return results[0].get("Results", [])
    return []


def fetch_driver_standings(year: str, round_num: Optional[str] = None):
    """Fetch driver standings"""
    if round_num:
        url = f"{API_BASE}/{year}/{round_num}/driverStandings.json"
        filename = f"driver_standings_round_{round_num}.json"
    else:
        url = f"{API_BASE}/{year}/driverStandings.json"
        filename = "driver_standings_final.json"
    
    data = fetch_json(url)
    if data:
        save_json(data, DATA_DIR / year / filename)
        standings = data.get("MRData", {}).get("StandingsTable", {}).get("StandingsLists", [])
        if standings:
            return standings[0].get("DriverStandings", [])
    return []


def fetch_constructor_standings(year: str, round_num: Optional[str] = None):
    """Fetch constructor standings"""
    if round_num:
        url = f"{API_BASE}/{year}/{round_num}/constructorStandings.json"
        filename = f"constructor_standings_round_{round_num}.json"
    else:
        url = f"{API_BASE}/{year}/constructorStandings.json"
        filename = "constructor_standings_final.json"
    
    data = fetch_json(url)
    if data:
        save_json(data, DATA_DIR / year / filename)
        standings = data.get("MRData", {}).get("StandingsTable", {}).get("StandingsLists", [])
        if standings:
            return standings[0].get("ConstructorStandings", [])
    return []


def fetch_all_data_for_year(year: str, fetch_all_results: bool = False):
    """Fetch all data for a specific year"""
    print(f"\n{'='*50}")
    print(f"Fetching data for {year} season")
    print(f"{'='*50}")
    
    # Fetch races list
    races = fetch_races(year)
    
    if not races:
        print(f"No races found for {year}")
        return
    
    # Fetch final standings
    print(f"\nFetching final standings...")
    fetch_driver_standings(year)
    fetch_constructor_standings(year)
    
    # Fetch individual race data
    if fetch_all_results:
        print(f"\nFetching individual race data...")
        for race in races:
            round_num = race.get("round")
            race_name = race.get("raceName", "Unknown")
            print(f"\n  Round {round_num}: {race_name}")
            fetch_race_results(year, round_num)


def generate_summary():
    """Generate a summary of fetched data"""
    summary = {
        "last_updated": datetime.now().isoformat(),
        "seasons": {}
    }
    
    for year in YEARS:
        year_dir = DATA_DIR / year
        if year_dir.exists():
            files = list(year_dir.glob("*.json"))
            races_file = year_dir / "races.json"
            
            race_count = 0
            if races_file.exists():
                with open(races_file) as f:
                    data = json.load(f)
                    race_count = len(data.get("MRData", {}).get("RaceTable", {}).get("Races", []))
            
            summary["seasons"][year] = {
                "files_count": len(files),
                "races_count": race_count
            }
    
    summary_file = DATA_DIR / "summary.json"
    with open(summary_file, 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2)
    
    print(f"\n{'='*50}")
    print("Data Summary:")
    print(f"{'='*50}")
    print(json.dumps(summary, indent=2))


def main():
    """Main function"""
    print("F1 Ground Effect Era Data Fetcher")
    print("=================================")
    print(f"Target years: {', '.join(YEARS)}")
    
    # Setup
    ensure_data_dir()
    
    # Ask user if they want to fetch all race results (takes longer)
    fetch_all = input("\nFetch all individual race results? (y/N): ").lower().strip() == 'y'
    
    # Fetch data for each year
    for year in YEARS:
        fetch_all_data_for_year(year, fetch_all)
    
    # Generate summary
    generate_summary()
    
    print(f"\n{'='*50}")
    print("Data fetching complete!")
    print(f"Data saved to: {DATA_DIR}")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
