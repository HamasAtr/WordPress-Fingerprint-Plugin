# Custom Fingerprint Plugin

Custom Fingerprint Plugin is a WordPress plugin that allows you to collect and store various information from website visitors to create a unique fingerprint for each user. This fingerprint can be used for analytics, tracking user behavior, or enhancing website security.

## Features

- Collects user information such as browser name, device type, canvas data, WebGL information, and user's time zone.
- Retrieves user's location using the ipinfo.io API.
- Tracks the time spent by the user on the website.
- Stores the collected data in a MySQL database.

## Requirements

- WordPress 4.0 or higher
- PHP 5.6 or higher
- MySQL database

## Installation

1. Download the "custom_fingerprint_plugin" folder from the repository.
2. Upload the "custom_fingerprint_plugin" folder to the "wp-content/plugins/" directory of your WordPress installation.
3. Activate the plugin from the WordPress admin dashboard.

## Configuration

1. Create a new database table to store the fingerprint data. You can use the following SQL query to create the table:
```
CREATE TABLE fingerprints_of_user (
id INT(11) AUTO_INCREMENT PRIMARY KEY,
canvas TEXT,
webgl TEXT,
device VARCHAR(255),
browser VARCHAR(255),
location VARCHAR(255),
timezone VARCHAR(255),
time_spent INT(11),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. Update the database connection details in "custom_fingerprint_plugin.php" with your database credentials.

3. Make sure you have an API token for the ipinfo.io API and replace "YOUR_IPINFO_API_TOKEN" in the JavaScript code with your actual API token.

## Usage

The plugin will automatically start collecting user information and sending it to the server when a user visits your WordPress website. The data will be stored in the "fingerprints_of_user" table in your database.


## Support

If you encounter any issues or have any questions, please [create an issue](https://github.com/hamasatr/custom-fingerprint-plugin/issues) on the GitHub repository.

## Credits

Custom Fingerprint Plugin was developed by [Hamas Akhtar](https://hamasakhtar.netlify.app/).

## Disclaimer

Please note that collecting user data and fingerprints may have legal implications, and it's essential to comply with privacy laws and obtain user consent if required.

Use this plugin responsibly and always respect the privacy of your website visitors.

Make sure to replace placeholders such as YOUR_NAME, YOUR_WEBSITE, and YOUR_IPINFO_API_TOKEN with your actual information.
