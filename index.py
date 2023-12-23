# views.py

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import ContributorProfileForm, PhotoForm
from .models import ContributorProfile, Photo

@login_required
def create_contributor_profile(request):
    if request.method == 'POST':
        form = ContributorProfileForm(request.POST, request.FILES)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()
            return redirect('home')  # Change 'home' to your home URL
    else:
        form = ContributorProfileForm()
    return render(request, 'create_profile.html', {'form': form})

@login_required
def submit_photo(request):
    if request.method == 'POST':
        form = PhotoForm(request.POST, request.FILES)
        if form.is_valid():
            photo = form.save(commit=False)
            photo.contributor = ContributorProfile.objects.get(user=request.user)
            photo.save()
            return redirect('home')  # Change 'home' to your home URL
    else:
        form = PhotoForm()
    return render(request, 'submit_photo.html', {'form': form})
# urls.py

from django.urls import path
from .views import create_contributor_profile, submit_photo

urlpatterns = [
    path('create-profile/', create_contributor_profile, name='create_profile'),
    path('submit-photo/', submit_photo, name='submit_photo'),
]
