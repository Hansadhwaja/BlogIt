# frozen_string_literal: true

module Posts
  class FilterService
    attr_reader :posts, :params

    def initialize(posts, params)
      @posts = posts
      @params = params
    end

    def process
      by_title
      by_status
      by_category_ids
      posts.distinct
    end

    private

      def by_title
        return if params[:title].blank?

        @posts = posts.where("title LIKE ?", "%#{params[:title]}%")
      end

      def by_status
        return if params[:status].blank?

        @posts = posts.where(status: params[:status])
      end

      def by_category_ids
        return if params[:category_ids].blank?

        @posts = posts.joins(:categories).where(categories: { id: params[:category_ids].map(&:to_i) })
      end
  end
end
