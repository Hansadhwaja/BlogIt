# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, except: %i[new edit], param: :slug
    resources :categories, only: %i[index create]
    resources :users, only: :create
    resources :organizations, only: :index
    resource :session, only: %i[create destroy]
    resources :user_posts, only: [:index]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
