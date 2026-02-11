"""
Django settings for backend project.
"""

from pathlib import Path

# ----------------------
# Paths
# ----------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# ----------------------
# Security
# ----------------------
SECRET_KEY = 'django-insecure-5_akj1+rhcpn=40u*5jjk3=^05%$ovn7q)kgoyie72s2to9ha5'
DEBUG = False  # Set False in production
ALLOWED_HOSTS = ['*']  

# ----------------------
# Installed Apps
# ----------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',   # ✅ Required for frontend API requests
    'album',         # Your app
]

# ----------------------
# Middleware
# ----------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',          # ✅ Must be first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',    # ✅ For static files
]

# ----------------------
# Root and Templates
# ----------------------
ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# ----------------------
# Database
# ----------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ----------------------
# Password Validators
# ----------------------
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# ----------------------
# Internationalization
# ----------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ----------------------
# Static & Media
# ----------------------
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ----------------------
# CORS (Allow React Frontend)
# ----------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",                 # React dev server
    "http://127.0.0.1:5173",
    "https://your-frontend.netlify.app",     # Netlify frontend
]

# ----------------------
# Optional: Whitenoise Settings (if serving static files)
# ----------------------
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

