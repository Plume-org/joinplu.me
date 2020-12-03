require "pathname"

BUILD_DIR = "build"
TRANS_DIR = "trans"

desc "Build site"
multitask :build_site => [:build_base, "crowdin:download"] do
  Pathname.glob("#{TRANS_DIR}/**/*.html").select(&:file?).each do |path|
    content = path.read
    content.sub! /<script type="text\/javascript" src="\/\/cdn.crowdin.com\/jipt\/jipt.js"><\/script>/, ""
    dest = Pathname(path.to_path.sub(TRANS_DIR, BUILD_DIR))
    $stderr.puts "copy #{path} -> #{dest}"
    dest.parent.mkpath
    dest.write content
  end
end

task :build_base do
  sh "middleman", "build"
end

desc "Build site for translation"
task :build_trans do
  env = {"CROWDIN" => "on"}
  sh env, "middleman", BUILD_DIR, "--build-dir", TRANS_DIR
end

namespace :crowdin do
  desc "Download translations"
  task :download do
    sh "crowdin", "download"
  end

  desc "Upload translation sources"
  task :upload do
    sh "crowdin", "upload"
  end
end
