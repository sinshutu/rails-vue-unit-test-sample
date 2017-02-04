module ApplicationHelper
  def webpack_asset_path(path)
    if Rails.env.development?
      return "http://localhost:8080/assets/#{path}"
    end

    manifest = Rails.application.config.assets.webpack_manifest
    if manifest && manifest[path].present?
      path = manifest[path]
    end

    "#{compute_asset_host}/assets/#{path}"
  end
end
